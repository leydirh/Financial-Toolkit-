// Ray's Financial Toolkit App Logic

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initBottomNav();
});

// Chart.js Initialization with Electric Blue Color Palette
function initCharts() {
  const doughnutCtx = document.getElementById('expenseDoughnutChart');
  const barCtx = document.getElementById('expenseBarChart');

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
            '#1d4ed8', // Royal Blue
            '#3b82f6', // Electric Blue
            '#60a5fa', // Light Blue
            '#93c5fd', // Soft Sky Blue
            '#bfdbfe', // Ice Blue
            '#38bdf8', // Cyan Accent
            '#1e40af', // Darker Blue
            '#64748b'  // Slate
          ],
          borderColor: '#152243',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { family: 'Inter', size: 11 },
              padding: 10
            }
          },
          tooltip: {
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

  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Tuition', 'Housing & Meals', 'Transit & Tech', 'Personal & Emergency'],
        datasets: [
          {
            label: 'Option A: Chestnut Dorm ($27,120)',
            data: [14180, 27120, 1940, 3500],
            backgroundColor: '#3b82f6',
            borderRadius: 6
          },
          {
            label: 'Option B: Off-Campus Apartment ($13,200)',
            data: [14180, 13200, 1940, 3500],
            backgroundColor: '#60a5fa',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: 'Inter' } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#94a3b8',
              font: { family: 'Inter' },
              callback: function(value) { return '$' + value.toLocaleString(); }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#f8fafc', font: { family: 'Inter', size: 12 } }
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
