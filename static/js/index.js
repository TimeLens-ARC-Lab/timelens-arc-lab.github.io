window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';

            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

    // Initialize leaderboard
    initializeLeaderboard();

})

// Leaderboard Data
const leaderboardData = {
    proprietary: [
        {
            model: "GPT-4o",
            url: "https://platform.openai.com/docs/models/gpt-4o",
            c_r1_03: 60.6, c_r1_05: 44.5, c_r1_07: 23.5, c_miou: 41.8,
            a_r1_03: 55.2, a_r1_05: 41.4, a_r1_07: 25.8, a_miou: 40.4,
            q_r1_03: 69.0, q_r1_05: 54.8, q_r1_07: 38.5, q_miou: 52.1
        },
        {
            model: "GPT-5",
            url: "https://platform.openai.com/docs/models/gpt-5",
            c_r1_03: 59.3, c_r1_05: 42.0, c_r1_07: 22.0, c_miou: 40.5,
            a_r1_03: 57.4, a_r1_05: 44.9, a_r1_07: 30.4, a_miou: 42.9,
            q_r1_03: 72.4, q_r1_05: 60.4, q_r1_07: 46.4, q_miou: 56.8
        },
        {
            model: "Gemini-2.0-Flash",
            url: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash",
            c_r1_03: 66.4, c_r1_05: 53.5, c_r1_07: 27.1, c_miou: 46.7,
            a_r1_03: 62.9, a_r1_05: 54.0, a_r1_07: 37.7, a_miou: 49.3,
            q_r1_03: 76.2, q_r1_05: 66.4, q_r1_07: 48.3, q_miou: 60.8
        },
        {
            model: "Gemini-2.5-Flash",
            url: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash",
            c_r1_03: 68.7, c_r1_05: 56.1, c_r1_07: 30.6, c_miou: 48.6,
            a_r1_03: 66.8, a_r1_05: 57.5, a_r1_07: 41.3, a_miou: 52.5,
            q_r1_03: 78.2, q_r1_05: 69.4, q_r1_07: 55.0, q_miou: 64.3
        },
        {
            model: "Gemini-2.5-Pro",
            url: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro",
            c_r1_03: 74.1, c_r1_05: 61.1, c_r1_07: 34.0, c_miou: 52.8,
            a_r1_03: 72.3, a_r1_05: 64.2, a_r1_07: 47.1, a_miou: 58.1,
            q_r1_03: 84.1, q_r1_05: 75.9, q_r1_07: 61.1, q_miou: 70.4
        }
    ],
    opensource: [
        {
            model: "VideoChat-Flash-7B",
            url: "https://github.com/OpenGVLab/VideoChat-Flash",
            c_r1_03: 60.2, c_r1_05: 37.9, c_r1_07: 17.8, c_miou: 39.7,
            a_r1_03: 35.5, a_r1_05: 21.8, a_r1_07: 10.5, a_miou: 24.8,
            q_r1_03: 45.2, q_r1_05: 30.6, q_r1_07: 16.7, q_miou: 32.7
        },
        {
            model: "VideoChat-R1-7B",
            url: "https://github.com/OpenGVLab/VideoChat-R1",
            c_r1_03: 51.9, c_r1_05: 30.8, c_r1_07: 11.7, c_miou: 33.7,
            a_r1_03: 35.0, a_r1_05: 23.9, a_r1_07: 11.3, a_miou: 25.0,
            q_r1_03: 29.3, q_r1_05: 19.1, q_r1_07: 9.4, q_miou: 21.5
        },
        {
            model: "Time-R1-7B",
            url: "https://github.com/xiaomi-research/time-r1",
            c_r1_03: 57.9, c_r1_05: 32.0, c_r1_07: 16.9, c_miou: 36.6,
            a_r1_03: 44.8, a_r1_05: 31.0, a_r1_07: 19.0, a_miou: 33.1,
            q_r1_03: 65.8, q_r1_05: 51.5, q_r1_07: 36.1, q_miou: 49.2
        },
        {
            model: "MiMo-VL-7B",
            url: "https://github.com/XiaomiMiMo/MiMo-VL",
            c_r1_03: 57.9, c_r1_05: 42.6, c_r1_07: 20.5, c_miou: 39.6,
            a_r1_03: 49.3, a_r1_05: 38.7, a_r1_07: 22.4, a_miou: 35.5,
            q_r1_03: 57.1, q_r1_05: 42.6, q_r1_07: 28.4, q_miou: 41.5
        },
        {
            model: "Qwen2.5-VL-7B",
            url: "https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct",
            c_r1_03: 59.7, c_r1_05: 37.8, c_r1_07: 16.6, c_miou: 39.3,
            a_r1_03: 44.1, a_r1_05: 31.0, a_r1_07: 16.1, a_miou: 31.4,
            q_r1_03: 41.5, q_r1_05: 27.8, q_r1_07: 15.2, q_miou: 31.6
        },
        {
            model: "TimeLens-7B",
            url: "https://huggingface.co/TencentARC/TimeLens-7B",
            c_r1_03: 70.5, c_r1_05: 55.6, c_r1_07: 28.4, c_miou: 48.8,
            a_r1_03: 62.8, a_r1_05: 51.0, a_r1_07: 32.6, a_miou: 46.2,
            q_r1_03: 74.1, q_r1_05: 62.7, q_r1_07: 43.1, q_miou: 56.0
        },
        {
            model: "Qwen3-VL-8B",
            url: "https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct",
            c_r1_03: 69.2, c_r1_05: 53.4, c_r1_07: 27.5, c_miou: 48.3,
            a_r1_03: 62.1, a_r1_05: 51.2, a_r1_07: 34.4, a_miou: 46.8,
            q_r1_03: 74.2, q_r1_05: 64.6, q_r1_07: 49.3, q_miou: 59.4
        },
        {
            model: "TimeLens-8B",
            url: "https://huggingface.co/TencentARC/TimeLens-8B",
            c_r1_03: 76.6, c_r1_05: 63.0, c_r1_07: 35.2, c_miou: 55.2,
            a_r1_03: 68.9, a_r1_05: 58.4, a_r1_07: 40.6, a_miou: 53.2,
            q_r1_03: 80.2, q_r1_05: 71.6, q_r1_07: 55.5, q_miou: 65.5
        }
    ]
};

// Calculate average for each model
function calculateAverage(model) {
    const metrics = [
        'c_r1_03', 'c_r1_05', 'c_r1_07', 'c_miou',
        'a_r1_03', 'a_r1_05', 'a_r1_07', 'a_miou',
        'q_r1_03', 'q_r1_05', 'q_r1_07', 'q_miou'
    ];
    const sum = metrics.reduce((acc, metric) => acc + model[metric], 0);
    return (sum / metrics.length).toFixed(1);
}

// Add average to all models
leaderboardData.proprietary.forEach(model => {
    model.avg = parseFloat(calculateAverage(model));
    model.type = 'Proprietary';
});

leaderboardData.opensource.forEach(model => {
    model.avg = parseFloat(calculateAverage(model));
    model.type = 'Open-Source';
});

// Sort tables
let currentSort = {
    proprietary: { column: 'avg', direction: 'desc' },
    opensource: { column: 'avg', direction: 'desc' },
    combined: { column: 'avg', direction: 'desc' }
};

function sortTable(tableType, column) {
    // Don't allow sorting on rank and model columns
    if (column === 'rank' || column === 'model') {
        return;
    }

    const sortState = currentSort[tableType];

    // Toggle direction if same column, otherwise default to desc
    if (sortState.column === column) {
        sortState.direction = sortState.direction === 'desc' ? 'asc' : 'desc';
    } else {
        sortState.column = column;
        sortState.direction = 'desc';
    }

    renderTable(tableType);
}

function getSortedData(data, column, direction) {
    return [...data].sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];

        // Handle string comparison for model names and type
        if (column === 'model' || column === 'type') {
            aVal = aVal.toString().toLowerCase();
            bVal = bVal.toString().toLowerCase();
            return direction === 'asc' ?
                aVal.localeCompare(bVal) :
                bVal.localeCompare(aVal);
        }

        // Numeric comparison
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
}

function formatValue(value) {
    if (typeof value === 'number') {
        return value.toFixed(1);
    }
    return value;
}

function renderTable(tableType) {
    let data, tbody, sortState;

    if (tableType === 'proprietary') {
        data = leaderboardData.proprietary;
        tbody = document.getElementById('proprietaryTableBody');
        sortState = currentSort.proprietary;
    } else if (tableType === 'opensource') {
        data = leaderboardData.opensource;
        tbody = document.getElementById('opensourceTableBody');
        sortState = currentSort.opensource;
    } else if (tableType === 'combined') {
        data = [...leaderboardData.proprietary, ...leaderboardData.opensource];
        tbody = document.getElementById('combinedTableBody');
        sortState = currentSort.combined;
    }

    const sortedData = getSortedData(data, sortState.column, sortState.direction);

    // Find best scores for highlighting
    const bestScores = {};
    const metrics = [
        'c_r1_03', 'c_r1_05', 'c_r1_07', 'c_miou',
        'a_r1_03', 'a_r1_05', 'a_r1_07', 'a_miou',
        'q_r1_03', 'q_r1_05', 'q_r1_07', 'q_miou', 'avg'
    ];

    metrics.forEach(metric => {
        bestScores[metric] = Math.max(...sortedData.map(m => m[metric]));
    });

    // Clear table
    tbody.innerHTML = '';

    // Map column names to cell indices
    const columnIndexMap = {
        'c_r1_03': tableType === 'combined' ? 3 : 2,
        'c_r1_05': tableType === 'combined' ? 4 : 3,
        'c_r1_07': tableType === 'combined' ? 5 : 4,
        'c_miou': tableType === 'combined' ? 6 : 5,
        'a_r1_03': tableType === 'combined' ? 7 : 6,
        'a_r1_05': tableType === 'combined' ? 8 : 7,
        'a_r1_07': tableType === 'combined' ? 9 : 8,
        'a_miou': tableType === 'combined' ? 10 : 9,
        'q_r1_03': tableType === 'combined' ? 11 : 10,
        'q_r1_05': tableType === 'combined' ? 12 : 11,
        'q_r1_07': tableType === 'combined' ? 13 : 12,
        'q_miou': tableType === 'combined' ? 14 : 13,
        'avg': tableType === 'combined' ? 15 : 14
    };

    const activeCellIndex = columnIndexMap[sortState.column];

    // Populate table
    sortedData.forEach((model, index) => {
        const row = document.createElement('tr');

        // Rank
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        // Model name
        const modelCell = document.createElement('td');
        const modelLink = document.createElement('a');
        modelLink.href = model.url || '#';
        modelLink.textContent = model.model;
        modelLink.target = '_blank';
        modelLink.rel = 'noopener noreferrer';
        modelCell.appendChild(modelLink);
        row.appendChild(modelCell);

        // Type (only for combined view)
        if (tableType === 'combined') {
            const typeCell = document.createElement('td');
            const badge = document.createElement('span');
            badge.classList.add('model-badge');
            badge.classList.add(model.type === 'Proprietary' ? 'badge-proprietary' : 'badge-opensource');
            badge.textContent = model.type;
            typeCell.appendChild(badge);
            row.appendChild(typeCell);
        }

        // Metrics
        let cellIndex = tableType === 'combined' ? 3 : 2;
        metrics.forEach(metric => {
            const cell = document.createElement('td');
            const value = model[metric];
            cell.textContent = formatValue(value);

            // Highlight best scores
            if (value === bestScores[metric]) {
                cell.classList.add('best-score');
            }

            // Highlight active sorted column
            if (cellIndex === activeCellIndex) {
                cell.classList.add('active-sort');
            }

            row.appendChild(cell);
            cellIndex++;
        });

        tbody.appendChild(row);
    });

    // Update column headers to show sort direction
    updateSortIndicators(tableType);
}

function updateSortIndicators(tableType) {
    let tableId;
    if (tableType === 'proprietary') {
        tableId = 'proprietaryTable';
    } else if (tableType === 'opensource') {
        tableId = 'opensourceTable';
    } else {
        tableId = 'combinedTable';
    }

    const table = document.getElementById(tableId);
    const headers = table.querySelectorAll('.sortable');

    // Remove all sort indicators and active highlighting
    headers.forEach(header => {
        header.classList.remove('sorted-asc', 'sorted-desc', 'active-sort');
    });

    const sortState = currentSort[tableType];
    const sortedHeader = Array.from(headers).find(h => {
        const onclick = h.getAttribute('onclick');
        return onclick && onclick.includes(`'${sortState.column}'`);
    });

    if (sortedHeader) {
        sortedHeader.classList.add(sortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
        sortedHeader.classList.add('active-sort');
    }
}

// View switching
function switchView(viewType) {
    const separatedView = document.getElementById('separatedView');
    const combinedView = document.getElementById('combinedView');
    const separatedBtn = document.getElementById('separatedViewBtn');
    const combinedBtn = document.getElementById('combinedViewBtn');

    if (viewType === 'separated') {
        separatedView.style.display = 'block';
        combinedView.style.display = 'none';
        separatedBtn.classList.add('is-primary');
        combinedBtn.classList.remove('is-primary');
    } else {
        separatedView.style.display = 'none';
        combinedView.style.display = 'block';
        separatedBtn.classList.remove('is-primary');
        combinedBtn.classList.add('is-primary');
    }
}

// Initialize leaderboard
function initializeLeaderboard() {
    renderTable('proprietary');
    renderTable('opensource');
    renderTable('combined');
}

