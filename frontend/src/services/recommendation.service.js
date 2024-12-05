// getRecommendations.js


/**
* Método para verificar se o produto contém alguma das opções selecionadas
* O retorno dessa função é o número de MATCHS com as opções selecionadas
*/
function containsAny(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item)).length;
}


/**
* Método para ordenar as recomendações de acordo com sua pontuação
*/
function sortArrayByScores(scores, arr) {
  const indices = scores
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.index);
  return indices.map(index => arr[index]);
}


/**
* Método para montar um array único com as opções selecionadas
*/
const getSelectedOptions = (formData) => [
  ...(formData.selectedFeatures || []),
  ...(formData.selectedPreferences || [])
];

/**
* Método para montar um array único com as opções do produto
*/
const getProductOptions = (product) => [
  ...(product.features || []),
  ...(product.preferences || [])
];

/**
* Método para listar recomendações e suas pontuações
*/
const calculateProductScores = (products, selectedOptions) => {
  const productScores = [];
  const recommendations = products.filter((product) => {
    const productOptions = getProductOptions(product);
    const match = containsAny(productOptions, selectedOptions);
    if (match) {
      productScores.push(match);
      return true;
    }
    return false;
  });
  return { recommendations, productScores };
};

/**
* Método para pegar a recomendação de maior nota e em caso de empate o último produto
*/
const getTopRecommendation = (productScores, recommendations) => {
  const biggestScore = Math.max(...productScores);
  const recommendationIndex = productScores.lastIndexOf(biggestScore);
  return [recommendations[recommendationIndex]];
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: Boolean },
  products
) => {
  const selectedOptions = getSelectedOptions(formData);

  const { recommendations, productScores } = calculateProductScores(products, selectedOptions);

  if (!recommendations.length) {
    return recommendations;
  }

  if (formData.selectedRecommendationType) {
    return sortArrayByScores(productScores, recommendations);
  } else {
    return getTopRecommendation(productScores, recommendations);
  }
};


export default { getRecommendations };
