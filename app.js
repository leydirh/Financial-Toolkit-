// Ray's Financial Toolkit App Logic

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initBottomNav();
});

// Chart.js Initialization with Vibrant Multi-Color Doughnut Palette
function initCharts() {
  const doughnutCtx = document.getElementById('expenseDoughnutChart');

  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Tuition ($14,180)',
          'Housing & Food ($27,120)',
          'Transportation ($840)',
          'Academic Supplies ($1,100)',
          'Clothing ($600)',
          'Phone Plan ($900)',
          'Entertainment ($2,400)',
          'Emergency Buffer ($500)'
        ],
        datasets: [{
          data: [14180, 27120, 840, 1100, 600, 900, 2400, 500],
          backgroundColor: [
            '#2563eb', // Royal Blue (Tuition)
            '#10b981', // Emerald Green (Housing & Food)
            '#f59e0b', // Amber Gold (Transportation)
            '#ef4444', // Coral Red (Academic Supplies)
            '#8b5cf6', // Vivid Purple (Clothing)
            '#06b6d4', // Cyan (Phone Plan)
            '#ec4899', // Rose Pink (Entertainment)
            '#6366f1'  // Indigo (Emergency Buffer)
          ],
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#334155',
              font: { family: 'Inter', size: 12, weight: '600' },
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#ffffff',
            bodyColor: '#f8fafc',
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                let value = context.parsed || 0;
                return ` ${label}: $${value.toLocaleString()}`;
              }
            }
          }
        }
      }
    });
  }
}

// Bottom Navigation Dock Interactivity
function initBottomNav() {
  const tabs = document.querySelectorAll('.nav-tab');
  const cards = document.querySelectorAll('.app-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);

      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth' });

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  });

  // Highlight bottom nav active tab based on scroll position
  window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY + 200;

    cards.forEach(card => {
      let cardTop = card.offsetTop;
      let cardHeight = card.offsetHeight;
      let cardId = card.getAttribute('id');

      if (currentScroll >= cardTop && currentScroll < cardTop + cardHeight) {
        tabs.forEach(t => {
          t.classList.remove('active');
          if (t.getAttribute('data-target') === cardId) {
            t.classList.add('active');
          }
        });
      }
    });
  });
}
