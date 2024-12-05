import React from 'react';
import Checkbox from '../../shared/Checkbox';


export const RecommendationTypeEnum = {
  SINGLE: 0,
  MULTIPLE: 1,
};

function RecommendationType({ selected, onRecommendationTypeChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value={RecommendationTypeEnum.SINGLE}
          onChange={() => onRecommendationTypeChange(RecommendationTypeEnum.SINGLE)}
          className="mr-2"
          checked={selected === RecommendationTypeEnum.SINGLE}
        />
        <label htmlFor="SingleProduct" className="mr-4">Produto Único</label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value={RecommendationTypeEnum.MULTIPLE}
          onChange={() => onRecommendationTypeChange(RecommendationTypeEnum.MULTIPLE)}
          className="mr-2"
          checked={selected === RecommendationTypeEnum.MULTIPLE}
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
