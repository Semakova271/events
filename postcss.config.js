module.exports = {
  plugins: [
    require('postcss-csso')({
      restructure: false, // Отключаем опасные оптимизации
      comments: false, // Удаляем комментарии
    })
  ]
};