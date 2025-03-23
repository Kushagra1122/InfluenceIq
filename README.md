# InfluenceIQ

## Introduction
Welcome to **InfluenceIQ**, an innovative platform designed to evaluate YouTube channels and provide detailed insights into their performance and engagement. By analyzing key metrics and using our optimized complex algorithm, InfluenceIQ generates an overall score for the channel, offering a comprehensive overview of its influence and activity.

## Features

### **Channel Overview**
- **Basic Information:** Displays the channel name, total videos, active years, total subscribers, and total views.
- **Engagement Stats:**
  - Total likes, comments, and views.
  - Ratios such as:
    - Like-to-view ratio.
    - Comment-to-view ratio.
    - Total engagement-to-view ratio.

### **Average Video Stats**
- Average views per video.
- Average likes per video.
- Average comments per video.

### **Latest Video Insights**
- Displays the thumbnail of the latest video for quick reference.

### **Views vs. Date Analysis**
- Graphical representation of views over the last 30 days for both shorts and long videos separately.
- **Unique functionality:** Clickable bars in the graph redirect users to the corresponding video.

## Getting Started

### **Prerequisites**
To set up and run this project, ensure you have the following installed:
- **Node.js**
- **npm** (Node Package Manager)
- **Tailwind CSS** (for frontend styling)

### **Installation Steps**

#### 1. Clone the Repository:
```bash
git clone https://github.com/Kushagra1122/InfluenceIq.git
```

#### 2. Create a `.env` File:
- Refer to `.env.example` for the required format.
- Obtain an API key and add it to your `.env` file.

#### 3. Install Dependencies:
Navigate to the backend directory:
```bash
cd backend
npm install
```

Navigate back to the root directory and then into the frontend directory:
```bash
cd ..
cd frontend
npm install
```

#### 4. Start Servers:
Start the backend server using Nodemon:
```bash
nodemon server
```

Start the frontend development server:
```bash
npm run dev
```

#### 5. Tailwind Setup:
- Configure Tailwind CSS as per your project requirements.

## Usage
Once both servers are running:
1. Input a YouTube channel URL into the app.
2. View the generated overall score for the channel.
3. Explore detailed stats including channel overview, engagement metrics, average video stats, and graphical analysis of views vs. date for shorts and long videos.
4. Use clickable bars in graphs to navigate directly to specific videos.

## FAQs

### **What does the overall score represent?**
The score is a composite metric based on subscriber count, engagement ratios, and content activity over time.

### **How are engagement ratios calculated?**
Ratios like like-to-view and comment-to-view are derived by dividing total likes or comments by total views.

### **Can I analyze shorts and long videos separately?**
Yes! The app provides separate stats for shorts and long videos views over the last 30 days.

## Contact Us
For support or inquiries:
- **Email:** [shivanshnitk.231ee155@nitk.edu.in](mailto:shivanshnitk.231ee155@nitk.edu.in)
- **Phone:** 7070357924

Let **InfluenceIQ** help you unlock deeper insights into YouTube channels! 🚀
