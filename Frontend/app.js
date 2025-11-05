/**
 * MedAI - Advanced Skin Cancer Detection System
 * Professional medical-grade interface with enhanced UX
 */

// Enhanced cancer types with detailed medical information
const cancerTypes = [
    {
        name: "Actinic Keratosis",
        code: "akiec",
        description: "Rough, scaly patches on sun-exposed skin that can develop into squamous cell carcinoma if left untreated.",
        risk: "Medium",
        prevalence: "Very Common",
        treatment: "Topical treatments, cryotherapy, or photodynamic therapy",
        color: "#ea580c"
    },
    {
        name: "Basal Cell Carcinoma",
        code: "bcc",
        description: "Most common form of skin cancer, typically appears as a pearly or waxy bump with visible blood vessels.",
        risk: "High",
        prevalence: "Most Common",
        treatment: "Surgical excision, Mohs surgery, or radiation therapy",
        color: "#dc2626"
    },
    {
        name: "Dermatofibroma",
        code: "df",
        description: "Benign fibrous nodules that commonly occur on the legs, usually harmless but may be cosmetically concerning.",
        risk: "Low",
        prevalence: "Common",
        treatment: "Usually no treatment needed, surgical excision if bothersome",
        color: "#059669"
    },
    {
        name: "Melanoma",
        code: "mel",
        description: "Most serious type of skin cancer that develops in melanocytes. Can spread rapidly if not caught early.",
        risk: "High",
        prevalence: "Less Common",
        treatment: "Surgical excision, immunotherapy, targeted therapy, or chemotherapy",
        color: "#7c3aed"
    },
    {
        name: "Nevus (Mole)",
        code: "nv",
        description: "Common benign moles that are usually harmless but should be monitored for changes in size, color, or shape.",
        risk: "Low",
        prevalence: "Very Common",
        treatment: "Monitoring, surgical removal if suspicious changes occur",
        color: "#059669"
    },
    {
        name: "Pigmented Benign Keratosis",
        code: "bkl",
        description: "Non-cancerous growths that appear brown or black, also called seborrheic keratoses.",
        risk: "Low",
        prevalence: "Common",
        treatment: "No treatment needed, can be removed for cosmetic reasons",
        color: "#059669"
    },
    {
        name: "Seborrheic Keratosis",
        code: "sk",
        description: "Common non-cancerous skin growths that appear waxy, scaly, or slightly raised.",
        risk: "Low",
        prevalence: "Very Common",
        treatment: "Usually no treatment needed, can be removed cosmetically",
        color: "#059669"
    },
    {
        name: "Squamous Cell Carcinoma",
        code: "scc",
        description: "Second most common skin cancer, appears as scaly red patches, open sores, or elevated growths.",
        risk: "High",
        prevalence: "Common",
        treatment: "Surgical excision, radiation therapy, or topical chemotherapy",
        color: "#dc2626"
    },
    {
        name: "Vascular Lesion",
        code: "vasc",
        description: "Blood vessel abnormalities in the skin including hemangiomas and other vascular malformations.",
        risk: "Low",
        prevalence: "Uncommon",
        treatment: "Laser therapy, sclerotherapy, or surgical removal if needed",
        color: "#0ea5e9"
    }
];

// Enhanced sample predictions with realistic medical scenarios
const samplePredictions = [
    {
        type: "Melanoma",
        confidence: 87.3,
        top_3: [
            {name: "Melanoma", confidence: 87.3},
            {name: "Nevus (Mole)", confidence: 8.2},
            {name: "Seborrheic Keratosis", confidence: 3.1}
        ],
        recommendation: "urgent"
    },
    {
        type: "Basal Cell Carcinoma", 
        confidence: 92.1,
        top_3: [
            {name: "Basal Cell Carcinoma", confidence: 92.1},
            {name: "Squamous Cell Carcinoma", confidence: 5.4},
            {name: "Actinic Keratosis", confidence: 2.1}
        ],
        recommendation: "urgent"
    },
    {
        type: "Nevus (Mole)",
        confidence: 94.7,
        top_3: [
            {name: "Nevus (Mole)", confidence: 94.7},
            {name: "Dermatofibroma", confidence: 3.8},
            {name: "Melanoma", confidence: 1.2}
        ],
        recommendation: "monitor"
    },
    {
        type: "Seborrheic Keratosis",
        confidence: 89.5,
        top_3: [
            {name: "Seborrheic Keratosis", confidence: 89.5},
            {name: "Pigmented Benign Keratosis", confidence: 7.2},
            {name: "Basal Cell Carcinoma", confidence: 2.8}
        ],
        recommendation: "routine"
    },
    {
        type: "Actinic Keratosis",
        confidence: 76.8,
        top_3: [
            {name: "Actinic Keratosis", confidence: 76.8},
            {name: "Squamous Cell Carcinoma", confidence: 15.3},
            {name: "Seborrheic Keratosis", confidence: 6.2}
        ],
        recommendation: "followup"
    }
];

// Medical recommendations based on diagnosis
const medicalRecommendations = {
    urgent: [
        {
            icon: "⚠️",
            title: "Immediate Medical Attention",
            description: "Schedule an appointment with a dermatologist within 48 hours for professional evaluation and potential biopsy.",
            type: "urgent"
        },
        {
            icon: "🏥",
            title: "Specialist Referral",
            description: "Request a referral to an oncological dermatologist for specialized cancer treatment if diagnosis is confirmed.",
            type: "info"
        }
    ],
    followup: [
        {
            icon: "📅",
            title: "Follow-up Required",
            description: "Schedule an appointment with a dermatologist within 2-4 weeks for professional examination.",
            type: "warning"
        },
        {
            icon: "👁️",
            title: "Monitor Changes",
            description: "Watch for any changes in size, color, shape, or texture and document with photos.",
            type: "info"
        }
    ],
    monitor: [
        {
            icon: "👁️",
            title: "Regular Monitoring",
            description: "Continue regular self-examinations and annual dermatology checkups.",
            type: "info"
        },
        {
            icon: "📸",
            title: "Document Changes",
            description: "Take regular photos to track any changes in appearance over time.",
            type: "info"
        }
    ],
    routine: [
        {
            icon: "✅",
            title: "Routine Care",
            description: "No immediate treatment needed, but continue regular skin examinations.",
            type: "success"
        },
        {
            icon: "🌞",
            title: "Sun Protection",
            description: "Use broad-spectrum SPF 30+ sunscreen daily and avoid prolonged sun exposure.",
            type: "info"
        }
    ]
};

// Enhanced Application State Management
class MedAISkinCancerApp {
    constructor() {
        this.currentFile = null;
        this.analysisResults = null;
        this.elements = {};
        this.animationFrames = [];
        this.theme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.getElements();
        this.setupEventListeners();
        this.setupTheme();
        this.populateCancerTypes();
        this.setupIntersectionObserver();
        this.startCounterAnimations();
        this.setupNavigation();
    }

    getElements() {
        this.elements = {
            // Navigation
            navbar: document.getElementById('navbar'),
            themeToggle: document.getElementById('themeToggle'),
            mobileMenuToggle: document.getElementById('mobileMenuToggle'),
            backToTop: document.getElementById('backToTop'),

            // Upload section
            uploadArea: document.getElementById('uploadArea'),
            fileInput: document.getElementById('fileInput'),
            uploadProgressRing: document.getElementById('uploadProgressRing'),
            
            // Preview section
            imagePreview: document.getElementById('imagePreview'),
            previewImage: document.getElementById('previewImage'),
            imageFilename: document.getElementById('imageFilename'),
            imageSize: document.getElementById('imageSize'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            removeBtn: document.getElementById('removeBtn'),

            // Analysis section
            analysisProgress: document.getElementById('analysisProgress'),
            progressFill: document.getElementById('progressFill'),
            progressPercentage: document.getElementById('progressPercentage'),
            analysisSteps: document.getElementById('analysisSteps'),

            // Results section
            resultsSection: document.getElementById('resultsSection'),
            primaryPrediction: document.getElementById('primaryPrediction'),
            confidenceText: document.getElementById('confidenceText'),
            confidenceProgress: document.getElementById('confidenceProgress'),
            riskIndicator: document.getElementById('riskIndicator'),
            predictionDescription: document.getElementById('predictionDescription'),
            predictionsList: document.getElementById('predictionsList'),
            confidenceChart: document.getElementById('confidenceChart'),
            recommendationCards: document.getElementById('recommendationCards'),
            
            // Action buttons
            downloadReportBtn: document.getElementById('downloadReportBtn'),
            newAnalysisBtn: document.getElementById('newAnalysisBtn'),
            shareResultsBtn: document.getElementById('shareResultsBtn'),

            // Content sections
            cancerTypesGrid: document.getElementById('cancerTypesGrid'),
            loadingOverlay: document.getElementById('loadingOverlay')
        };
    }

    setupEventListeners() {
        const { 
            uploadArea, fileInput, analyzeBtn, removeBtn, newAnalysisBtn,
            themeToggle, backToTop, downloadReportBtn, shareResultsBtn,
            mobileMenuToggle
        } = this.elements;

        // Upload functionality
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
            
            // Drag and drop
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                uploadArea.addEventListener(eventName, (e) => this.handleDragEvent(e, eventName));
                document.addEventListener(eventName, this.preventDefaults, false);
            });
        }

        // Button events
        analyzeBtn?.addEventListener('click', () => this.startAnalysis());
        removeBtn?.addEventListener('click', () => this.removeImage());
        newAnalysisBtn?.addEventListener('click', () => this.startNewAnalysis());
        downloadReportBtn?.addEventListener('click', () => this.downloadReport());
        shareResultsBtn?.addEventListener('click', () => this.shareResults());

        // Theme and navigation
        themeToggle?.addEventListener('click', () => this.toggleTheme());
        backToTop?.addEventListener('click', () => this.scrollToTop());
        mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Sample images
        document.querySelectorAll('.sample-image-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.loadSampleImage(e.target.dataset.sample));
        });

        // FAQ toggles
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleFAQ(e.target));
        });

        // Scroll events
        window.addEventListener('scroll', this.throttle(() => {
            this.updateNavbar();
            this.updateBackToTop();
        }, 100));

        // Resize events
        window.addEventListener('resize', this.throttle(() => {
            this.handleResize();
        }, 250));
    }

    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon() {
        const icon = this.elements.themeToggle?.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }

    // File Handling
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && this.isValidFile(file)) {
            this.currentFile = file;
            this.displayImagePreview(file);
            this.showUploadSuccess();
        } else if (file) {
            this.showError('Please select a valid image file (JPG, PNG, or JPEG under 10MB)');
        }
    }

    handleDragEvent(event, eventType) {
        this.preventDefaults(event);
        
        const { uploadArea } = this.elements;
        
        switch(eventType) {
            case 'dragenter':
            case 'dragover':
                uploadArea.classList.add('drag-over');
                break;
            case 'dragleave':
                uploadArea.classList.remove('drag-over');
                break;
            case 'drop':
                uploadArea.classList.remove('drag-over');
                const files = event.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];
                    if (this.isValidFile(file)) {
                        this.currentFile = file;
                        this.displayImagePreview(file);
                        this.showUploadSuccess();
                    } else {
                        this.showError('Please select a valid image file (JPG, PNG, or JPEG under 10MB)');
                    }
                }
                break;
        }
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    isValidFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
            return false;
        }
        
        if (file.size > maxSize) {
            this.showError('File size must be less than 10MB');
            return false;
        }
        
        return true;
    }

    displayImagePreview(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.elements.previewImage.src = e.target.result;
            this.elements.imageFilename.textContent = file.name;
            this.elements.imageSize.textContent = this.formatFileSize(file.size);
            
            // Smooth transition
            this.elements.uploadArea.classList.add('hidden');
            setTimeout(() => {
                this.elements.imagePreview.classList.remove('hidden');
                this.animateImagePreview();
            }, 200);
            
            this.hideResults();
        };
        
        reader.onerror = () => {
            this.showError('Error reading file. Please try again.');
        };
        
        reader.readAsDataURL(file);
    }

    animateImagePreview() {
        const preview = this.elements.imagePreview;
        preview.style.opacity = '0';
        preview.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            preview.style.transition = 'all 0.5s ease';
            preview.style.opacity = '1';
            preview.style.transform = 'translateY(0)';
        }, 50);
    }

    removeImage() {
        this.currentFile = null;
        this.elements.previewImage.src = '';
        this.elements.fileInput.value = '';
        
        // Smooth transition
        this.elements.imagePreview.classList.add('hidden');
        this.elements.analysisProgress.classList.add('hidden');
        setTimeout(() => {
            this.elements.uploadArea.classList.remove('hidden');
        }, 200);
        
        this.hideResults();
    }

    // Analysis Process
    startAnalysis() {
        if (!this.currentFile) {
            this.showError('Please upload an image first');
            return;
        }

        // Hide preview actions and show progress
        this.elements.imagePreview.querySelector('.preview-actions').classList.add('hidden');
        this.elements.analysisProgress.classList.remove('hidden');
        
        // Animate scroll to analysis section
        this.elements.analysisProgress.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });

        this.simulateAnalysis();
    }

    simulateAnalysis() {
        const progressSteps = [
            { progress: 0, text: "🔄 Initializing AI model...", icon: "⚡" },
            { progress: 12, text: "📸 Loading and validating image...", icon: "📸" },
            { progress: 25, text: "🔍 Preprocessing and enhancement...", icon: "🔍" },
            { progress: 40, text: "🧠 Extracting visual features...", icon: "🧠" },
            { progress: 60, text: "🔬 Running CNN analysis...", icon: "🔬" },
            { progress: 78, text: "📊 Processing predictions...", icon: "📊" },
            { progress: 92, text: "⚕️ Calculating confidence scores...", icon: "⚕️" },
            { progress: 100, text: "✅ Analysis complete!", icon: "✅" }
        ];

        let stepIndex = 0;
        
        const updateProgress = () => {
            if (stepIndex < progressSteps.length) {
                const step = progressSteps[stepIndex];
                
                // Update progress bar
                this.elements.progressFill.style.width = `${step.progress}%`;
                this.elements.progressPercentage.textContent = `${step.progress}%`;
                
                // Update step indicator
                this.updateAnalysisSteps(step, stepIndex);
                
                stepIndex++;
                setTimeout(updateProgress, 800);
            } else {
                // Analysis complete
                setTimeout(() => {
                    this.elements.analysisProgress.classList.add('hidden');
                    this.showResults();
                }, 800);
            }
        };

        updateProgress();
    }

    updateAnalysisSteps(step, index) {
        // Clear previous steps
        this.elements.analysisSteps.innerHTML = '';
        
        // Add current step
        const stepElement = document.createElement('div');
        stepElement.className = 'step-item active';
        stepElement.innerHTML = `
            <div class="step-icon">${step.icon}</div>
            <div class="step-text">${step.text}</div>
        `;
        
        this.elements.analysisSteps.appendChild(stepElement);
    }

    // Results Display
    showResults() {
        // Get random realistic prediction
        const prediction = samplePredictions[Math.floor(Math.random() * samplePredictions.length)];
        this.analysisResults = prediction;
        
        // Find cancer info
        const cancerInfo = cancerTypes.find(c => c.name === prediction.type);
        
        // Update primary prediction
        this.elements.primaryPrediction.textContent = prediction.type;
        this.elements.confidenceText.textContent = `${prediction.confidence.toFixed(1)}%`;
        this.elements.predictionDescription.textContent = cancerInfo ? cancerInfo.description : '';
        
        // Update risk indicator
        if (cancerInfo) {
            const riskClass = `risk-${cancerInfo.risk.toLowerCase()}`;
            this.elements.riskIndicator.className = `risk-indicator ${riskClass}`;
            this.elements.riskIndicator.textContent = `${cancerInfo.risk} Risk`;
        }
        
        // Animate confidence ring
        this.animateConfidenceRing(prediction.confidence);
        
        // Update predictions list
        this.updatePredictionsList(prediction.top_3);
        
        // Update confidence chart
        this.updateConfidenceChart(prediction.top_3);
        
        // Update recommendations
        this.updateRecommendations(prediction.recommendation);
        
        // Show results with animation
        this.elements.resultsSection.classList.remove('hidden');
        this.animateResultsSection();
    }

    animateConfidenceRing(confidence) {
        const circle = this.elements.confidenceProgress;
        if (!circle) return;
        
        const circumference = 226; // 2 * π * 36 (radius)
        const offset = circumference - (confidence / 100) * circumference;
        
        // Reset animation
        circle.style.strokeDashoffset = circumference;
        
        // Animate to final value
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
            circle.style.strokeDashoffset = offset;
        }, 500);
    }

    updatePredictionsList(predictions) {
        const list = this.elements.predictionsList;
        list.innerHTML = '';
        
        predictions.forEach((pred, index) => {
            const item = document.createElement('div');
            item.className = 'prediction-item';
            item.style.animationDelay = `${index * 0.1}s`;
            item.innerHTML = `
                <span class="prediction-item-name">${index + 1}. ${pred.name}</span>
                <span class="prediction-item-confidence">${pred.confidence.toFixed(1)}%</span>
            `;
            list.appendChild(item);
        });
    }

    updateConfidenceChart(predictions) {
        const chart = this.elements.confidenceChart;
        chart.innerHTML = '';
        
        predictions.forEach((pred, index) => {
            const bar = document.createElement('div');
            bar.className = 'confidence-bar';
            bar.innerHTML = `
                <div class="confidence-bar-name">${pred.name}</div>
                <div class="confidence-bar-track">
                    <div class="confidence-bar-fill" style="width: 0%"></div>
                </div>
                <div class="confidence-bar-value">${pred.confidence.toFixed(1)}%</div>
            `;
            chart.appendChild(bar);
            
            // Animate bar fill
            setTimeout(() => {
                const fill = bar.querySelector('.confidence-bar-fill');
                fill.style.width = `${pred.confidence}%`;
            }, 500 + index * 200);
        });
    }

    updateRecommendations(recommendationType) {
        const recommendations = medicalRecommendations[recommendationType] || medicalRecommendations.routine;
        const container = this.elements.recommendationCards;
        
        container.innerHTML = '';
        
        recommendations.forEach((rec, index) => {
            const card = document.createElement('div');
            card.className = `recommendation-card ${rec.type}`;
            card.style.animationDelay = `${index * 0.2}s`;
            card.innerHTML = `
                <div class="rec-icon">${rec.icon}</div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    animateResultsSection() {
        const section = this.elements.resultsSection;
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            
            // Scroll to results
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }

    hideResults() {
        this.elements.resultsSection.classList.add('hidden');
        this.analysisResults = null;
    }

    startNewAnalysis() {
        this.removeImage();
        
        // Smooth scroll to upload area
        setTimeout(() => {
            this.elements.uploadArea.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
    }

    // Sample Images
    loadSampleImage(type) {
        // Create a sample prediction for demo
        const samplePrediction = samplePredictions.find(p => p.type.toLowerCase().includes(type)) || 
                               samplePredictions[0];
        
        // Create a placeholder image URL
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Draw placeholder
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, 300, 300);
        ctx.fillStyle = '#6b7280';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`Sample ${type} image`, 150, 140);
        ctx.fillText('For demonstration only', 150, 160);
        
        const dataUrl = canvas.toDataURL();
        
        // Set preview
        this.elements.previewImage.src = dataUrl;
        this.elements.imageFilename.textContent = `sample-${type}.jpg`;
        this.elements.imageSize.textContent = '2.1 MB';
        
        // Show preview
        this.elements.uploadArea.classList.add('hidden');
        setTimeout(() => {
            this.elements.imagePreview.classList.remove('hidden');
            this.animateImagePreview();
        }, 200);
        
        this.hideResults();
        
        // Set as current file for analysis
        this.currentFile = { name: `sample-${type}.jpg`, size: 2100000, type: 'image/jpeg' };
    }

    // Download and Share
    downloadReport() {
        if (!this.analysisResults) return;
        
        const report = this.generateReportContent();
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `skin-analysis-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccess('Report downloaded successfully!');
    }

    shareResults() {
        if (!this.analysisResults || !navigator.share) {
            // Fallback for browsers without native sharing
            this.copyResultsToClipboard();
            return;
        }
        
        const shareData = {
            title: 'MedAI Skin Analysis Results',
            text: `AI Analysis Result: ${this.analysisResults.type} (${this.analysisResults.confidence.toFixed(1)}% confidence)`,
            url: window.location.href
        };
        
        navigator.share(shareData)
            .then(() => this.showSuccess('Results shared successfully!'))
            .catch(() => this.copyResultsToClipboard());
    }

    copyResultsToClipboard() {
        const results = this.generateReportContent();
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(results)
                .then(() => this.showSuccess('Results copied to clipboard!'))
                .catch(() => this.showError('Failed to copy results'));
        } else {
            // Fallback method
            const textarea = document.createElement('textarea');
            textarea.value = results;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showSuccess('Results copied to clipboard!');
        }
    }

    generateReportContent() {
        const results = this.analysisResults;
        const timestamp = new Date().toLocaleString();
        
        return `
MedAI Skin Cancer Analysis Report
Generated: ${timestamp}

PRIMARY DIAGNOSIS:
${results.type} (${results.confidence.toFixed(1)}% confidence)

TOP PREDICTIONS:
${results.top_3.map((p, i) => `${i + 1}. ${p.name}: ${p.confidence.toFixed(1)}%`).join('\n')}

IMPORTANT DISCLAIMER:
This AI analysis is for educational and screening purposes only. 
Always consult with a qualified healthcare professional for proper 
medical evaluation, diagnosis, and treatment.

Report generated by MedAI - Advanced Skin Cancer Detection System
        `.trim();
    }

    // Cancer Types Population
    populateCancerTypes() {
        const grid = this.elements.cancerTypesGrid;
        if (!grid) return;
        
        cancerTypes.forEach((type, index) => {
            const card = document.createElement('div');
            card.className = 'cancer-type-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            const riskClass = type.risk.toLowerCase();
            
            card.innerHTML = `
                <div class="cancer-type-header">
                    <h3 class="cancer-type-name">${type.name}</h3>
                    <span class="cancer-type-risk ${riskClass}">${type.risk} Risk</span>
                </div>
                <p class="cancer-type-description">${type.description}</p>
                <div class="cancer-type-details">
                    <div class="detail-item">
                        <strong>Prevalence:</strong> ${type.prevalence}
                    </div>
                    <div class="detail-item">
                        <strong>Treatment:</strong> ${type.treatment}
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    // Navigation and UI
    setupNavigation() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offset = 80; // Account for fixed navbar
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    updateNavbar() {
        const navbar = this.elements.navbar;
        if (!navbar) return;
        
        const scrolled = window.scrollY > 50;
        navbar.style.background = scrolled ? 
            'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
            
        if (this.theme === 'dark') {
            navbar.style.background = scrolled ? 
                'rgba(15, 23, 42, 0.98)' : 'rgba(15, 23, 42, 0.95)';
        }
    }

    updateBackToTop() {
        const backToTop = this.elements.backToTop;
        if (!backToTop) return;
        
        const scrolled = window.scrollY > 300;
        backToTop.classList.toggle('hidden', !scrolled);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    toggleMobileMenu() {
        // Implementation for mobile menu toggle
        const navLinks = document.querySelector('.nav-links');
        navLinks?.classList.toggle('active');
    }

    // FAQ Management
    toggleFAQ(button) {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !expanded);
        
        // Close other FAQ items
        document.querySelectorAll('.faq-question').forEach(btn => {
            if (btn !== button) {
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Animation and Effects
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // Observe elements for animation
        document.querySelectorAll('.stat-card, .about-card, .cancer-type-card').forEach(el => {
            observer.observe(el);
        });
    }

    startCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = Date.now();
            
            const update = () => {
                const now = Date.now();
                const progress = Math.min((now - start) / duration, 1);
                const value = Math.floor(progress * target);
                
                counter.textContent = value;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };
            
            update();
        };

        // Start animation when elements come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Utility Functions
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showUploadSuccess() {
        this.showNotification('Image uploaded successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'error' ? '❌' : '✅'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Add to document
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    handleResize() {
        // Handle responsive layout changes
        const isMobile = window.innerWidth < 768;
        // Implement mobile-specific behavior
    }
}

// Notification Styles (CSS-in-JS for dynamic notifications)
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        border: 1px solid #e5e7eb;
        z-index: 9999;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        min-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification--error {
        border-left: 4px solid #dc2626;
    }

    .notification--success {
        border-left: 4px solid #059669;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-icon {
        font-size: 1.125rem;
    }

    .notification-message {
        color: #374151;
        font-weight: 500;
    }

    [data-theme="dark"] .notification {
        background: #1f2937;
        border-color: #374151;
    }

    [data-theme="dark"] .notification-message {
        color: #f3f4f6;
    }
`;
document.head.appendChild(style);

// Initialize Application
const app = new MedAISkinCancerApp();