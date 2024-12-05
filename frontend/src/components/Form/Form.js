// Form.js

import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import { RecommendationTypeEnum } from "./Fields/RecommendationType";

function Form() {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: RecommendationTypeEnum.SINGLE,
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendations(formData);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selected={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" onClick={handleSubmit} />
    </form>
  );
}

export default Form;
