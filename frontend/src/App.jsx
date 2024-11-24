import BookingForm from "./components/Agendamento";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Header } from './components/Header';
import './global.css';
import Nav from './components/Nav';
import { useState, useEffect} from 'react';
import HoraDisponivel from './components/HoraDisponivel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AppContent() {
  const [agendamentoData, setAgendamentoData] = useState({
    nome: '',
    data: '',
    especializacao: '',
    horario: '',
    unidade: '',
    medico: ''
  });
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Log de informações do agendamento sempre que houver mudanças
  useEffect(() => {
    if (agendamentoData) {
      console.log('Dados atuais do agendamento:', {
        nome: agendamentoData.nome,
        data: agendamentoData.data,
        horario: agendamentoData.horario,
        especializacao: agendamentoData.especializacao,
        unidade: agendamentoData.unidade,
        medico: agendamentoData.medico
      });
    }
  }, [agendamentoData]);

  useEffect(() => {
    if (location.pathname === "/agendar" || location.pathname === "/horarios-disponiveis") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  const handleHorarioSubmit = (horarioData) => {
    // Combinar os dados existentes com os novos dados antes da validação
    const dadosCombinados = {
      ...agendamentoData,
      ...horarioData
    };

    // Validação após a combinação dos dados
    if (!dadosCombinados.data) {
      alert('Por favor, selecione uma data');
      return;
    }
    if (!dadosCombinados.horario) {
      alert('Por favor, selecione um horário');
      return;
    }

    setAgendamentoData(dadosCombinados);
    navigate('/agendar');
  };

  const handleBookingSubmit = (bookingData) => {
    // Validar se os dados não estão vazios
    if (!bookingData.nome || !bookingData.especializacao || !bookingData.unidade || !bookingData.medico) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const dadosCompletos = {
      ...agendamentoData,
      ...bookingData
    };

    // Verificar se todos os campos necessários estão preenchidos e não são strings vazias
    const camposObrigatorios = ['nome', 'data', 'horario', 'especializacao', 'unidade', 'medico'];
    const camposFaltando = camposObrigatorios.filter(campo => !dadosCompletos[campo] || dadosCompletos[campo].trim() === '');

    if (camposFaltando.length > 0) {
      console.log(`Por favor, preencha os seguintes campos: ${camposFaltando.join(', ')}`);
      return;
    }

    console.log('Detalhes do Agendamento:', dadosCompletos);
    
    toast.success('Agendamento realizado com sucesso!');
    // Opcional: navegar para outra página após o sucesso
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      {location.pathname !== "/horarios-disponiveis" && (
        <div>
          <img className="doutora" src="/src/assets/doutora.png" alt="Doutora" />
          <Routes>
            <Route 
              path="/agendar" 
              element={
                <BookingForm 
                  onSubmit={handleBookingSubmit} 
                  dadosAgendamento={agendamentoData} 
                />
              } 
            />
          </Routes>
        </div>
      )}
      <Routes>
        <Route 
          path="/horarios-disponiveis" 
          element={
            <HoraDisponivel 
              onSubmit={handleHorarioSubmit} 
              dadosAgendamento={agendamentoData} 
            />
          } 
        />
      </Routes>
      {showNav && <Nav />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}