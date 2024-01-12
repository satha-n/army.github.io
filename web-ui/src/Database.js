const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database/db.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});

//////////////////////////////
//////////////////////////////
// Military Personnel related queries
const getUserByServiceNumber = (serviceNumber, callback) => {
    db.get('SELECT * FROM MILITARY_USERS WHERE SERVICE_NUMBER = ?', [serviceNumber], function(err, row) {
        callback(err, row);
  });
};

const getUsersByUnits = (units, callback) => {
    const placeholders = units.map(() => '?').join(',');
    const sql = `SELECT * FROM MILITARY_USERS WHERE POSTEDUNIT IN (${placeholders}) OR HOMEUNIT IN (${placeholders})`;
    db.all(sql, units, function(err, rows) {
        callback(err, rows);
    });
}

const getUsersByRanks = (ranks, callback) => {
    const placeholders = ranks.map(() => '?').join(',');
    const sql = `SELECT * FROM MILITARY_USERS WHERE RANK IN (${placeholders})`;
    db.all(sql, ranks, function(err, rows) {
        callback(err, rows);
    });
}

const getUsersByTrades = (trades, callback) => {
    const placeholders = trades.map(() => '?').join(',');
    const sql = `SELECT * FROM MILITARY_USERS WHERE TRADE IN (${placeholders})`;
    db.all(sql, trades, function(err, rows) {
        callback(err, rows);
    });
}

const getUsersByQualifications = (qualifications, callback) => {
    const placeholders = qualifications.map(() => '?').join(',');
    const sql = `SELECT * FROM MILITARY_USERS WHERE QUALIFICATIONS IN (${placeholders})`;
    db.all(sql, qualifications, function(err, rows) {
        callback(err, rows);
    });
}

const getUsersByUnitsAndRanks = (units, ranks, callback) => {
    const unitPlaceholders = units.map(() => '?').join(',');
    const rankPlaceholders = ranks.map(() => '?').join(',');
    const sql = `SELECT * FROM MILITARY_USERS WHERE (POSTEDUNIT IN (${unitPlaceholders}) OR HOMEUNIT IN (${unitPlaceholders})) AND RANK IN (${rankPlaceholders})`;
    const params = [...units, ...units, ...ranks];
    db.all(sql, params, function(err, rows) {
        callback(err, rows);
    });
}

const getUsersByUnitsAndRanksAndTrades = (units, ranks, trades, callback) => {
    const unitPlaceholders = units.map(() => '?').join(',');
    const rankPlaceholders = ranks.map(() => '?').join(',');
    const tradePlaceholders = trades.map(() => '?').join(',');
    const sql = `SELECT * FROM MILITARY_USERS WHERE (POSTEDUNIT IN (${unitPlaceholders}) OR HOMEUNIT IN (${unitPlaceholders})) AND RANK IN (${rankPlaceholders}) AND TRADE IN (${tradePlaceholders})`;
    const params = [...units, ...units, ...ranks, ...trades];
    db.all(sql, params, function(err, rows) {
        callback(err, rows);
    });
}

const getUsersByUnitsAndRanksAndTradesAndQualifications = (units, ranks, trades, qualifications, callback) => {
    const unitPlaceholders = units.map(() => '?').join(',');
    const rankPlaceholders = ranks.map(() => '?').join(',');
    const tradePlaceholders = trades.map(() => '?').join(',');
    const qualificationPlaceholders = qualifications.map(() => '?').join(',');
    const sql = `SELECT * FROM MILITARY_USERS WHERE (POSTEDUNIT IN (${unitPlaceholders}) OR HOMEUNIT IN (${unitPlaceholders})) AND RANK IN (${rankPlaceholders}) AND TRADE IN (${tradePlaceholders}) AND QUALIFICATIONS IN (${qualificationPlaceholders})`;
    const params = [...units, ...units, ...ranks, ...trades, ...qualifications];
    db.all(sql, params, function(err, rows) {
        callback(err, rows);
    });
}

//////////////////////////////
//////////////////////////////
// Staff Checks queries

const getStaffCheckById = (id, callback) => {
    db.get('SELECT * FROM STAFF_CHECKS WHERE STAFF_CHECK_ID = ?', [id], function(err, row) {
        callback(err, row);
  });
}

const getStaffChecksByUnits = (units, callback) => {
    const sql = `SELECT * FROM STAFF_CHECKS WHERE ${units.map(() => "TARGET_UNIT LIKE ?").join(" OR ")}`;
    const params = units.map(unit => `%${unit}%`);
    db.all(sql, params, function(err, rows) {
        callback(err, rows);
    });
}

// const staffCheck = {
//     TITLE: 'Required, string',
//     DESCRIPTION: 'Required, string',
//     START_DATE: 'Required, date (YYYY-MM-DD)',
//     END_DATE: 'Required, date (YYYY-MM-DD)',
//     EXPIRE_DATE: 'Required, date (YYYY-MM-DD)',
//     LOCATION: 'Required, string',
//     WANTED_TRADES: 'Optional, comma-separated list of trades',
//     WANTED_QUALIFICATIONS: 'Optional, comma-separated list of qualifications',
//     WANTED_RANKS: 'Required, comma-separated list of ranks',
//     TARGET_UNITS: 'Required, comma-separated list of units',
//     CURRENT_ORG_LEVEL: 'Required string; L1, L2, L3, L4, L5, L6, L7',
//     OPI: 'Required, string (Unit UIC)',
//     ORG_LEVEL_4_WANTED_RECOMMENDATIONS: 'Optional, comma-separated list of recommendations positions',
//     STATUS: 'Open'
// };
const createStaffCheck = (staffCheck, callback) => {
    const { TITLE, DESCRIPTION, START_DATE, END_DATE, EXPIRE_DATE, LOCATION, WANTED_TRADES, WANTED_QUALIFICATIONS, WANTED_RANKS, TARGET_UNITS, CURRENT_ORG_LEVEL, OPI, ORG_LEVEL_4_WANTED_RECOMMENDATIONS, STATUS } = staffCheck;
    db.run('INSERT INTO STAFF_CHECKS (TITLE, DESCRIPTION, START_DATE, END_DATE, EXPIRE_DATE, LOCATION, WANTED_TRADES, WANTED_QUALIFICATIONS, WANTED_RANKS, TARGET_UNITS, CURRENT_ORG_LEVEL, OPI, ORG_LEVEL_4_WANTED_RECOMMENDATIONS, STATUS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [TITLE, DESCRIPTION, START_DATE, END_DATE, EXPIRE_DATE, LOCATION, WANTED_TRADES, WANTED_QUALIFICATIONS, WANTED_RANKS, TARGET_UNITS, CURRENT_ORG_LEVEL, OPI, STATUS, ORG_LEVEL_4_WANTED_RECOMMENDATIONS], function(err) {
        callback(err);
    });
}

// const modifiedStaffCheck = {
//     STAFF_CHECK_ID: 'Required, integer',
//     TITLE: 'Optional, string',
//     DESCRIPTION: 'Optional, string',
//     START_DATE: 'Optional, date (YYYY-MM-DD)',
//     END_DATE: 'Optional, date (YYYY-MM-DD)',
//     EXPIRE_DATE: 'Optional, date (YYYY-MM-DD)',
//     LOCATION: 'Optional, string',
//     WANTED_TRADES: 'Optional, comma-separated list of trades',
//     WANTED_QUALIFICATIONS: 'Optional, comma-separated list of qualifications',
//     WANTED_RANKS: 'Optional, comma-separated list of ranks',
//     TARGET_UNITS: 'Optional, comma-separated list of units',
//     ORG_LEVEL_4_WANTED_RECOMMENDATIONS: 'Optional, comma-separated list of recommendations positions',
//     STATUS: 'Optional string; Open, Closed'
// }
const modifyStaffCheckById = (modifiedStaffCheck, callback) => {
    const { STAFF_CHECK_ID, TITLE, DESCRIPTION, START_DATE, END_DATE, EXPIRE_DATE, LOCATION, WANTED_TRADES, WANTED_QUALIFICATIONS, WANTED_RANKS, TARGET_UNITS, ORG_LEVEL_4_WANTED_RECOMMENDATIONS, STATUS } = modifiedStaffCheck;

    const sql = `UPDATE STAFF_CHECKS SET 
        ${TITLE !== null ? "TITLE = ?," : ""} 
        ${DESCRIPTION !== null ? "DESCRIPTION = ?," : ""} 
        ${START_DATE !== null ? "START_DATE = ?," : ""} 
        ${END_DATE !== null ? "END_DATE = ?," : ""} 
        ${EXPIRE_DATE !== null ? "EXPIRE_DATE = ?," : ""} 
        ${LOCATION !== null ? "LOCATION = ?," : ""} 
        ${WANTED_TRADES !== null ? "WANTED_TRADES = ?," : ""} 
        ${WANTED_QUALIFICATIONS !== null ? "WANTED_QUALIFICATIONS = ?," : ""} 
        ${WANTED_RANKS !== null ? "WANTED_RANKS = ?," : ""} 
        ${TARGET_UNITS !== null ? "TARGET_UNITS = ?," : ""} 
        ${ORG_LEVEL_4_WANTED_RECOMMENDATIONS !== null ? "ORG_LEVEL_4_WANTED_RECOMMENDATIONS = ?," : ""} 
        ${STATUS !== null ? "STATUS = ?," : ""} 
        WHERE STAFF_CHECK_ID = ?`;

    const params = [
        ...(TITLE !== null ? [TITLE] : []), 
        ...(DESCRIPTION !== null ? [DESCRIPTION] : []), 
        ...(START_DATE !== null ? [START_DATE] : []), 
        ...(END_DATE !== null ? [END_DATE] : []), 
        ...(EXPIRE_DATE !== null ? [EXPIRE_DATE] : []), 
        ...(LOCATION !== null ? [LOCATION] : []), 
        ...(WANTED_TRADES !== null ? [WANTED_TRADES] : []), 
        ...(WANTED_QUALIFICATIONS !== null ? [WANTED_QUALIFICATIONS] : []), 
        ...(WANTED_RANKS !== null ? [WANTED_RANKS] : []), 
        ...(TARGET_UNITS !== null ? [TARGET_UNITS] : []), 
        ...(ORG_LEVEL_4_WANTED_RECOMMENDATIONS !== null ? [ORG_LEVEL_4_WANTED_RECOMMENDATIONS] : []), 
        ...(STATUS !== null ? [STATUS] : []), 
        STAFF_CHECK_ID
    ];

    db.run(sql, params, function(err) {
        callback(err);
    });
}


//////////////////////////////
//////////////////////////////
// Staff Checks Answers queries

const getStaffChecksAnswersByServiceNumber = (serviceNumber, callback) => {
    db.all('SELECT * FROM STAFF_CHECKS_ANSWERS WHERE MEMBER_SERVICE_NUMBER = ?', [serviceNumber], function(err, rows) {
        callback(err, rows);
    });
}

const getStaffChecksAnswersByStaffCheckId = (staffCheckId, callback) => {
    db.all('SELECT * FROM STAFF_CHECKS_ANSWERS WHERE STAFF_CHECK_ID = ?', [staffCheckId], function(err, rows) {
        callback(err, rows);
    });
}

// const staffCheckAnswer = {
//     STAFF_CHECK_ID: 'Required, integer',
//     MEMBER_SERVICE_NUMBER: 'Required, string',
//     MEMBER_LASTNAME: 'Required, string',
//     MEMBER_AVAILABILITY: 'Required, int; -2 (Non-selected), -1(Unavailable), 0 (Unknown), 1(Available), 2(Selected)',
//     MEMBER_MESSAGE: 'Optional, string',
//     CREATED_ON: 'Required, datehour (YYYY-MM-DD HH:MM:SS)'
// };

const createStaffCheckAnswer = (staffCheckAnswer, callback) => {
    const { STAFF_CHECK_ID, MEMBER_SERVICE_NUMBER, MEMBER_LASTNAME, MEMBER_AVAILABILITY, MEMBER_MESSAGE, CREATED_ON } = staffCheckAnswer;
    db.run('INSERT INTO STAFF_CHECKS_ANSWERS (STAFF_CHECK_ID, MEMBER_SERVICE_NUMBER, MEMBER_LASTNAME, MEMBER_AVAILABILITY, MEMBER_MESSAGE, CREATED_ON) VALUES (?, ?, ?, ?, ?, ?)', [STAFF_CHECK_ID, MEMBER_SERVICE_NUMBER, MEMBER_LASTNAME, MEMBER_AVAILABILITY, MEMBER_MESSAGE, CREATED_ON], function(err) {
        callback(err);
    });
}

// const modifiedStaffCheckAnswer = {
//     STAFF_CHECK_ID: 'Required, integer',
//     MEMBER_SERVICE_NUMBER: 'Required, string',
//     MEMBER_AVAILABILITY: 'Optional, int; -2 (Non-selected), -1(Unavailable), 0 (Unknown), 1(Available), 2(Selected)',
//     MEMBER_MESSAGE: 'Optional, string'
// };
const modifyStaffCheckAnswerById = (modifiedStaffCheckAnswer, callback) => {
    const { STAFF_CHECK_ID, MEMBER_SERVICE_NUMBER, MEMBER_AVAILABILITY, MEMBER_MESSAGE } = staffCheckAnswer;

    const sql = `UPDATE STAFF_CHECKS_ANSWERS SET 
        ${MEMBER_AVAILABILITY !== null ? "MEMBER_AVAILABILITY = ?," : ""} 
        ${MEMBER_MESSAGE !== null ? "MEMBER_MESSAGE = ?," : ""} 
        WHERE STAFF_CHECK_ID = ? AND MEMBER_SERVICE_NUMBER = ?`;

    const params = [
        ...(MEMBER_AVAILABILITY !== null ? [MEMBER_AVAILABILITY] : []), 
        ...(MEMBER_MESSAGE !== null ? [MEMBER_MESSAGE] : []), 
        STAFF_CHECK_ID, 
        MEMBER_SERVICE_NUMBER
    ];

    db.run(sql, params, function(err) {
        callback(err);
    });
}


//////////////////////////////
//////////////////////////////
// Chats queries

const getChatsByServiceNumber = (serviceNumber, callback) => {
    db.all('SELECT * FROM CHATS WHERE CHAT_MEMBERS_SERVICE_NUMBERS LIKE ?', [`%${serviceNumber}%`], function(err, rows) {
        callback(err, rows);
    });
}

const getChatAnswersByChatId = (chatId, callback) => {
    db.all('SELECT * FROM CHATS_ANSWERS WHERE CHAT_ID = ?', [chatId], function(err, rows) {
        callback(err, rows);
    });
}

// const chat = {
//     CHAT_NAME: 'Required, string',
//     CHAT_TYPE: 'Required string; StaffCheck, Chat or OrgChat',
//     CHAT_ORG_ID: 'Optional',
//     CHAT_STAFF_CHECK_ID: 'Optional',
//     CHAT_MEMBERS_SERVICE_NUMBERS: 'Required, comma-separated list of service numbers'
// };
const createChat = (chat, callback) => {
    const { CHAT_NAME, CHAT_TYPE, CHAT_ORG_ID, CHAT_STAFF_CHECK_ID, CHAT_MEMBERS_SERVICE_NUMBERS } = chat;
    db.run('INSERT INTO CHATS (CHAT_NAME, CHAT_TYPE, CHAT_ORG_ID, CHAT_STAFF_CHECK_ID, CHAT_MEMBERS_SERVICE_NUMBERS) VALUES (?, ?, ?, ?, ?)', [CHAT_NAME, CHAT_TYPE, CHAT_ORG_ID, CHAT_STAFF_CHECK_ID, CHAT_MEMBERS_SERVICE_NUMBERS], function(err) {
        callback(err);
    });
}

// System queries

const isUserAdmin = (email, callback) => {
    db.get('SELECT * FROM SYSTEM_USERS WHERE EMAIL = ?', [email], function(err, row) {
        callback(err, row);
  });
};









module.exports = {
    getUserByServiceNumber,
    getUsersByUnits,
    getUsersByRanks,
    getUsersByTrades,
    getUsersByQualifications,
    getUsersByUnitsAndRanks,
    getUsersByUnitsAndRanksAndTrades,
    getUsersByUnitsAndRanksAndTradesAndQualifications,
    getStaffCheckById,
    getStaffChecksByUnits,
    getStaffChecksAnswersByServiceNumber,
    getStaffChecksAnswersByStaffCheckId,
    getChatsByServiceNumber,
    getChatAnswersByChatId,
    createStaffCheck,
    modifyStaffCheckById,
    createStaffCheckAnswer,
    modifyStaffCheckAnswerById,
    createChat,
    isUserAdmin
};