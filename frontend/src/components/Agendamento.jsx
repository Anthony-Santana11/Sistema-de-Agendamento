import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Agendamento.modules.css'
import { FaSearch } from 'react-icons/fa';
import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR'; 
import { Link } from 'react-router-dom';


registerLocale('pt-BR', pt); 

function DateSelector({ selectedDate, onDateChange }) {
    return (
        <div className="form-group">
            <label htmlFor="date">Data:</label>
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
                locale="pt-BR" 
            />
        </div>
    );
}

DateSelector.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    onDateChange: PropTypes.func.isRequired,
};

function BookingForm ({ onSubmit, dadosAgendamento }) {
    
    const [name, setName] = useState(dadosAgendamento.nome || '');
    const [date, setDate] = useState(dadosAgendamento.data ? new Date(dadosAgendamento.data) : new Date());
    const [specialization, setSpecialization] = useState(dadosAgendamento.especializacao || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Certifique-se de que os valores não estão vazios
        const formData = {
            nome: name.trim(),
            especializacao: specialization.trim(),
            data: date
        };

        // Validar se há dados vazios
        if (Object.values(formData).some(value => !value)) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        onSubmit(formData);
    };

    // Adicione este console.log para verificar os dados iniciais
    console.log('dadosAgendamento recebido:', dadosAgendamento);

    const especializacoes = [
        "Cardiologia",
        "Dermatologia",
        "Nutrição",
        "Ortopedia",
        "Fonoaudiologia",
        "Oftalmologia"
    ];

    return (
       
         <form onSubmit={handleSubmit} className="form">
            <div className='form-txt'>
                <h1>Agende sua consulta !</h1>
            </div>
            <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" placeholder='Digite seu nome.' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            {name && (
                <div className="form-group">
                    <label htmlFor="especialização">Especialização:
                        <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                            <option value="">Selecione uma especialização.</option>
                            {especializacoes.map((esp, index) => (
                                <option key={index} value={esp}>{esp}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            {specialization && (
                <>
                    <DateSelector selectedDate={date} onDateChange={setDate} />
                </>
            )}

            {name && specialization && date && (
                <Link to = "/horarios-disponiveis">
                     <button type="submit" className="submit-button">
                        <FaSearch />
                    </button>
                </Link>
               
            )}
        </form>
    )
}

BookingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    dadosAgendamento: PropTypes.shape({
        nome: PropTypes.string,
        data: PropTypes.string,
        especializacao: PropTypes.string
    }).isRequired
};

export default BookingForm;
