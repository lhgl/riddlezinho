(function () {
  function showLoading() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.add('loading--visible');
  }

  function hideLoading() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.remove('loading--visible');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[data-loading]').forEach(function (form) {
      form.addEventListener('submit', function () {
        showLoading();
      });
    });
  });

  window.showLoading = showLoading;
  window.hideLoading = hideLoading;
})();
