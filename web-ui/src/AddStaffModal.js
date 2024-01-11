import React from 'react';
import Modal from 'react-modal';
import './styles/AddModalStyle.css'; // Importez le fichier CSS

function AddStaffModal({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="AddStaffModal"
        >
            <div className="modal-header">
                <h2>Nouvelle VEM</h2>
                <button onClick={onRequestClose}>X</button>
            </div>
            <hr />
            <div className="modal-body">
                <div className="left-section">
                    <label>
                        Titre de la VEM (Français):
                        <input type="text" />
                    </label>
                    <label>
                        Titre de la VEM (Anglais):
                        <input type="text" />
                    </label>
                    <label>
                        Date de début:
                        <input type="date" />
                    </label>
                    <label>
                        Date de fin:
                        <input type="date" />
                    </label>
                    <label>
                        Date limite de réponse:
                        <input type="date" />
                    </label>
                    <label>
                        Pièces jointes:
                        <input type="file" />
                    </label>
                    <label>
                        Emplacement physique:
                        <input type="text" />
                    </label>
                    <label>
                        Grade concerné:
                        <select>
                            {/* Options du combobox ici */}
                        </select>
                    </label>
                    <label>
                        Unités recevantes:
                        <select>
                            {/* Options du combobox ici */}
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea />
                    </label>
                </div>
                <div className="right-section">
                    <h3>Chaîne d'approbation</h3>
                    {/* Répétez ce bloc pour chaque checkbox */}
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <label>
                        <input type="checkbox" />
                        Texte ici
                    </label>
                    <p>Bonjour</p>
                </div>
            </div>
            <div className="modal-footer">
                <button className="send-button" onClick={onRequestClose}>Envoyer la VEM</button>
            </div>
        </Modal>
    );
}

export default AddStaffModal;