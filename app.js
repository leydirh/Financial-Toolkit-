// Ray's Financial Toolkit Application Script

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initRespCalculator();
});

// Chart.js Initialization
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
          'Transportation ($840/yr)',
          'Academic Supplies ($1,100)',
          'Clothing ($600/yr)',
          'Phone Plan ($900/yr)',
          'Entertainment ($2,400/yr)',
          'Emergency Buffer ($500)'
        ],
        datasets: [{
          data: [14180, 27120, 840, 1100, 600, 900, 2400, 500],
          backgroundColor: [
            '#002a5c', // U of T Navy
            '#38bdf8', // Accent Blue
            '#fbbf24', // Accent Gold
            '#34d399', // Green
            '#a78bfa', // Purple
            '#f472b6', // Pink
            '#fb923c', // Orange
            '#94a3b8'  // Muted Slate
          ],
          borderColor: '#131b2e',
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
              padding: 12
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
            backgroundColor: '#38bdf8',
            borderRadius: 6
          },
          {
            label: 'Option B: Off-Campus Apartment ($13,200)',
            data: [14180, 13200, 1940, 3500],
            backgroundColor: '#fbbf24',
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
            labels: { color: '#f1f5f9', font: { family: 'Inter', size: 12 } }
          }
        }
      }
    });
  }
}

// RESP 20% CESG Grant Calculator Logic
function initRespCalculator() {
  const annualInput = document.getElementById('respAnnual');
  const yearsInput = document.getElementById('respYears');
  const userDepEl = document.getElementById('respUserDep');
  const grantEl = document.getElementById('respGrant');
  const totalEl = document.getElementById('respTotal');

  function calculateResp() {
    if (!annualInput || !yearsInput) return;

    let annual = parseFloat(annualInput.value) || 0;
    let years = parseFloat(yearsInput.value) || 0;

    // Cap annual CESG eligible contribution at $2500 max per year according to Canada CESG rules
    let cesgEligibleAnnual = Math.min(annual, 2500);

    let userTotalDeposit = annual * years;
    let totalGrant = (cesgEligibleAnnual * 0.20) * years;
    let grandTotal = userTotalDeposit + totalGrant;

    if (userDepEl) userDepEl.textContent = `$${userTotalDeposit.toLocaleString()}`;
    if (grantEl) grantEl.textContent = `$${totalGrant.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${grandTotal.toLocaleString()}`;
  }

  if (annualInput && yearsInput) {
    annualInput.addEventListener('input', calculateResp);
    yearsInput.addEventListener('input', calculateResp);
    calculateResp();
  }
}
