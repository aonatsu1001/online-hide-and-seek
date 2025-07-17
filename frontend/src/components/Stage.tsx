import React from 'react'
import './../styles/Stage.css'

interface StageProps {
  stageImageUrl: string
}

const Stage: React.FC<StageProps> = ({ stageImageUrl }) => {
  return (
    <div
      className="stage-container"
      style={{ backgroundImage: `url(${stageImageUrl})` }}
    >
      {/* この中に、岩﨑さんが担当する「アイコンを隠す機能」などが入る */}
    </div>
  )
}

export default Stage
