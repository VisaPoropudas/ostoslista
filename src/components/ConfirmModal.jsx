export function ConfirmModal(props) {
    const { isOpen, title, message, onConfirm, onCancel } = props;

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onCancel} className="modal-btn cancel-modal-btn">
                        Peruuta
                    </button>
                    <button onClick={onConfirm} className="modal-btn confirm-modal-btn">
                        Poista
                    </button>
                </div>
            </div>
        </div>
    );
}
