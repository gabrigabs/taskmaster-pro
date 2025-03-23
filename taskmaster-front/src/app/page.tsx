import Link from "next/link";
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Bem-vindo ao TaskMaster Pro</h1>
        <p className="text-lg mb-6 max-w-2xl">
          Sua solução pessoal de gerenciamento de tarefas. Organize, priorize e complete suas tarefas com eficiência.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Link href="/tasks/new">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full sm:w-auto">
              Criar Tarefa
            </button>
          </Link>
          <Link href="/tasks">
            <button className="bg-blue-700 bg-opacity-40 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-60 transition-colors w-full sm:w-auto">
              Ver Todas as Tarefas
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <FaTasks className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Organize Tarefas</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Agrupe suas tarefas por categorias e defina prioridades para focar no que é mais importante.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <FaCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Acompanhe o Progresso</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe o status de suas tarefas de 'a fazer' até 'concluído' e construa um impulso positivo.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <FaClock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aumente a Produtividade</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Impulsione sua produtividade concentrando-se em tarefas bem definidas e prioridades claras.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pronto para se organizar?</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Comece a gerenciar suas tarefas com eficiência com o TaskMaster Pro. Crie sua primeira tarefa agora!
        </p>
        <Link href="/tasks/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Começar
          </button>
        </Link>
      </div>
    </div>
  );
}