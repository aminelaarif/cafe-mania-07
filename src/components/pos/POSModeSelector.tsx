import { Gift, Store, Clock } from 'lucide-react';
import { LoyaltyQRCode } from './LoyaltyQRCode';

interface POSModeSelectorProps {
  onModeSelect: (mode: 'pos' | 'timetracking' | 'loyalty') => void;
}

export const POSModeSelector = ({ onModeSelect }: POSModeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Système Point de Vente
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez votre mode de travail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Point de Vente */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
               onClick={() => onModeSelect('pos')}>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Store className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Point de Vente
              </h2>
              
              <p className="text-gray-600 mb-6">
                Accédez à l'interface de vente pour enregistrer les transactions
              </p>
              
              <ul className="text-left space-y-2 text-gray-700 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Enregistrer les ventes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Gérer les paiements
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Consulter l'historique
                </li>
              </ul>
              
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Accéder au Point de Vente
              </button>
            </div>
          </div>

          {/* Suivi du Temps */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
               onClick={() => onModeSelect('timetracking')}>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
                <Clock className="w-12 h-12 text-yellow-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Suivi du Temps
              </h2>
              
              <p className="text-gray-600 mb-6">
                Enregistrez vos heures de travail et gérez votre temps
              </p>
              
              <ul className="text-left space-y-2 text-gray-700 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Pointer à l'arrivée
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Pointer au départ
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Consulter les heures
                </li>
              </ul>
              
              <button className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                Accéder au Suivi du Temps
              </button>
            </div>
          </div>

          {/* Programme de Fidélité */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
               onClick={() => onModeSelect('loyalty')}>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Gift className="w-12 h-12 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Programme Fidélité
              </h2>
              
              <p className="text-gray-600 mb-6">
                Gestion du QR code pour l'inscription des clients au programme de fidélité
              </p>
              
              <ul className="text-left space-y-2 text-gray-700 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Générer QR codes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Inscrire nouveaux clients
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Approuver adhésions
                </li>
              </ul>
              
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Accéder à la Fidélité
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
