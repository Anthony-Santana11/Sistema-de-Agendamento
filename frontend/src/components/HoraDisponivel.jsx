import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Horas.modules.css';

function HoraDisponivel({ onSubmit, dadosAgendamento }) {
    const [selectedTime, setSelectedTime] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulando dados que virão do backend
    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                // Aqui você substituirá por sua chamada API real
                const dadosSimulados = [
                    { id: 1, horario: '09:00', medico: 'Dr. João Silva', unidade: 'Unidade Centro' },
                    { id: 2, horario: '10:00', medico: 'Dra. Maria Santos', unidade: 'Unidade Norte' },
                    { id: 3, horario: '11:00', medico: 'Dr. Pedro Costa', unidade: 'Unidade Sul' },
                ];
                
                setHorarios(dadosSimulados);
                setLoading(false);
            } catch (err) {
                setError(`Erro ao carregar horários: ${err.message}`);
                setLoading(false);
            }
        };

        fetchHorarios();
    }, []);

    // Adicione este useEffect
    useEffect(() => {
        console.log('Dados do agendamento:', dadosAgendamento);
    }, [dadosAgendamento]);

    const handleTimeSelect = (horario) => {
        setSelectedTime(horario);
    };

    const handleHorarioSelect = (horario, medico, unidade) => {
        onSubmit({
            horario: horario,
            medico: medico,
            unidade: unidade
        });
    };

    if (loading) return <div>Carregando horários...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="hora-disponivel">
            <h2>Horários Disponíveis</h2>
            <form onSubmit={handleHorarioSelect}>
                <div className="time-slots">
                    {horarios.map((horario) => (
                        <div 
                            key={horario.id} 
                            className={`time-slot ${selectedTime === horario.horario ? 'selected' : ''}`}
                        >
                            <button 
                                type="button" 
                                onClick={() => handleTimeSelect(horario.horario)}
                                className={selectedTime === horario.horario ? 'selected' : ''}
                            >
                                <div className="horario-info">
                                    <span className="hora">{horario.horario}</span>
                                    <span className="medico">{horario.medico}</span>
                                    <span className="unidade">{horario.unidade}</span>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                <button 
                    type="submit" 
                    className="hora-button"
                    disabled={!selectedTime}
                >
                    Confirmar Horário
                </button>
            </form>
        </div>
    );
}

HoraDisponivel.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    dadosAgendamento: PropTypes.object
};

export default HoraDisponivel;

