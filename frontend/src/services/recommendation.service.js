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

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: Boolean},
  products
) => {
  const selectedOptions = [...formData.selectedFeatures || [], ...formData.selectedPreferences || []]
  const productScores = []
  const recommendations = products.filter((product) => {
    const productOptions = [...product.features || [], ...product.preferences || []]
    const match = containsAny(productOptions, selectedOptions)
    if(match) {
      productScores.push(match)
      return true
    }
    return false;
  })
  if(!recommendations.length) {
    return recommendations;
  } else if(formData.selectedRecommendationType) {
    return sortArrayByScores(productScores, recommendations)
  } else {
    const biggestScore = Math.max(...productScores);
    const recommendationIndex = productScores.lastIndexOf(biggestScore)
    return [recommendations[recommendationIndex]]
  }
};

export default { getRecommendations };
