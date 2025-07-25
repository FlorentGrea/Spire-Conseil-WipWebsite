"use client";

export default function Method() {
  return (
    <div className="text-sc-tertiary leading-relaxed">
      <h3 className="text-lg font-bold text-sc-secondary mb-4">Méthode</h3>
      <div className="flex flex-col justify-center space-y-2">
        {/* Method Step 1 */}
        <div className="flex flex-row items-center relative">
          <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">01</span>
          </div>
          <p className="text-sm md:text-base font-bold">Audit de 6 familles de dysfonctionnements</p>
        </div>
        
        {/* Small text for Step 1 */}
        <div className="flex gap-4">
          <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
          <div className="flex-1">
            <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
              <li>• Condition de travail</li>
              <li>• Organisation du travail</li>
              <li>• Gestion du temps</li>
              <li>• Communication, coordination, coopération</li>
              <li>• Formation intégrée</li>
              <li>• Mise en œuvre stratégique</li>
            </ul>
          </div>
        </div>
        
        {/* Method Step 2 */}
        <div className="flex flex-row items-center relative">
          <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">02</span>
          </div>
          <p className="text-center text-sm md:text-base font-bold">Analyse des indicateurs</p>
        </div>
        
        {/* Small text for Step 2 */}
        <div className="flex gap-4">
          <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
          <div className="flex-1">
            <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
              <li>• Absentéisme</li>
              <li>• Accidents du travail</li>
              <li>• Rotation du personnel</li>
              <li>• Défauts de qualité</li>
              <li>• Écarts de productivité directe</li>
            </ul>
          </div>
        </div>
        
        {/* Method Step 3 */}
        <div className="flex flex-row items-center relative">
          <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">03</span>
          </div>
          <p className="text-center text-sm md:text-base font-bold">Analyse des impacts</p>
        </div>
        
        {/* Small text for Step 3 */}
        <div className="flex gap-4">
          <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
          <div className="flex-1">
            <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
              <li>• Sursalaires</li>
              <li>• Surtemps</li>
              <li>• Surconsommation</li>
              <li>• Non-production</li>
              <li>• Non-création de potentiels</li>
            </ul>
          </div>
        </div>
        
        {/* Method Step 4 */}
        <div className="flex flex-row items-center relative">
          <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">04</span>
          </div>
          <p className="text-center text-sm md:text-base font-bold">Mesure financière et extra-financière</p>
        </div>
        
        {/* Small text for Step 4 */}
        <div className="flex gap-4">
          <div className="w-0.5 bg-[#012073] ml-3 mr-4 self-stretch"></div>
          <div className="flex-1">
            <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
              <li>• Prix et coût unitaires des composants de régulation</li>
              <li>• Effet extra-financiers: sens au travail, relation clients, marque employeur, relation partenaires...</li>
            </ul>
          </div>
        </div>
        
        {/* Method Step 5 */}
        <div className="flex flex-row items-center relative">
          <div className="w-8 h-8 bg-[#012073] flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">05</span>
          </div>
          <p className="text-center text-sm md:text-base font-bold">Leviers managériaux</p>
        </div>
        
        {/* Small text for Step 5 */}
        <div className="flex gap-4 ml-12">
          <div className="flex-1">
            <ul className="text-xs md:text-sm space-y-1 text-sc-tertiary">
              <li>• Plan d'action managérial pour agir sur la cause des coûts cachés</li>
              <li>• Mise en œuvre d'un management subsidiaire au bénéfice de la compression des coûts cachés</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 