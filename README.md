![Github frame](https://github.com/user-attachments/assets/80ab60b3-32fa-47b0-a837-e2d7981cd732)

## **Concept**  
This platform is inspired by [**eBird**](https://ebird.org/) and [**iNaturalist**](https://www.inaturalist.org/), built to foster interest in **[wildlife](https://en.wikipedia.org/wiki/Wildlife)**, **[conservation](https://en.wikipedia.org/wiki/Conservation_biology)**, **[birdwatching](https://en.wikipedia.org/wiki/Birdwatching)**, and **[photography](https://en.wikipedia.org/wiki/Photography)**.  
My passion for nature and technology drove me to create a space where enthusiasts can **[log, track, and share](https://en.wikipedia.org/wiki/Nature_journal)** their observations while contributing to conservation efforts.
 

### **Core Features:**  
📍 **Track & Log Sightings** – Users can submit observations of birds, mammals, insects, fungi, and plants.  
🗺️ **Trail Tracking** – Track movement in real-time or manually plot trails and submit multiple sightings.  
📸 **Media Uploads & Peer Reviews** – Users can add **images, audio, and video** to validate sightings, with community-driven **peer reviews** for accuracy.  
🏆 **Gamified Leaderboard** – Encourages users to explore more by ranking contributions.  
👥 **Community & Collaboration** – Engage in discussions, plan meetups, and get feedback on wildlife photography.  

---

(This is just the plan... It is subject to changes. )

## **Tech Stack**  

### **Frontend (React + Vite)**  
- **Framework**: React.js with Vite 
- **UI Library**: Tailwind CSS
- **Maps & Geolocation**: Google Maps API (interactive mapping)  
- **File Storage**: Firebase Storage / Cloudinary (for media uploads)  
- **Authentication**: JWT & Google OAuth  

### **Backend (Node.js + Express + MongoDB)**  
- **Framework**: Express.js (REST API development)  
- **Database**: MongoDB + Mongoose (flexible document storage)  
- **Authentication**: JWT-based authentication & Google OAuth  
- **Geospatial Queries**: MongoDB’s `$geoNear` (find nearby sightings & trails)  
- **API Integrations**: Google Maps API, ( eBird API, iNaturalist (if it exists, for further integrations between platforms) )

### **Deployment & DevOps**  
- **Frontend Deployment**: Vercel / Netlify (Current) / Cloudflare  
- **Backend Deployment**: Railway / Render (Current) / DigitalOcean / Google Cloud Run  
- **Database Hosting**: MongoDB Atlas  
- **Storage**: Cloudinary  
- **Monitoring & Logs**: LogRocket (frontend) + Datadog (backend)  

---

## **Key Features & Differentiation**  

### **1️⃣ Sightings & Photo Uploads**  
✅ Users can log wildlife sightings with **species details, location, date, and media uploads**.  
✅ **Geospatial search** enables users to find sightings near them.  

### **2️⃣ Interactive Trail Tracking**  
✅ Users can **track their movement** via GPS and save/share trails. *(Future Scope: Allow manual plotting for better flexibility.)*  
✅ **Heatmaps & Hotspots** to visualize high-activity wildlife zones.  

### **3️⃣ Community-Driven Features**  
✅ **Photo Ratings & Feedback** – Get constructive feedback from fellow wildlife photographers.  
✅ **Discussion Forums & Groups** – Plan birdwatching events, co-explore trails, and share resources.  

### **4️⃣ Authentication & Personalization**  
✅ Secure authentication via **JWT & Google OAuth**.  
✅ Personalized **dashboard** to track user sightings, trails, and feedback.  

### **5️⃣ AI-Powered Enhancements (Future Scope)**  
🚀 **AI-Powered Species Recognition** (Google Vision API / TensorFlow.js).  
🚀 **Computer Vision for Photo Rating** *(Analyzing sharpness, focus, composition)*.  
🚀 **ML-based Predictive Wildlife Movement** *(Best times & locations for spotting species).*  

---

## **Development Timeline**  

### **✅ Initial Planning & Ideation**  
- **Day 1:** Brainstormed ideas and outlined project goals.  
- **Day 2:** Reviewed & refined features with feedback from **Rutuj & Arnab**.  

### **🖌️ UI/UX Design Phase**  
- **Day 3:** Started **low-fidelity design** in Figma, finalized main focus areas.  
- **Day 4:** Continued low-fidelity wireframes, prepared for high-fidelity design.  
- **Day 5:** Worked on **high-fidelity UI** (visual design, colors, branding).  

### **💻 Development Phase**  
- **Day 6:** Started project setup on **GitHub** (initialized frontend & backend).  
- **Ongoing:** Yet to be planned – refer to project roadmap for details.  

---

## **Project Status & Updates**  
Check out the **main project roadmap** for the latest progress and feature implementations.  
This document serves as a **brief assignment overview** and will evolve as development progresses.  

[Frontend Deploy](https://terraquest.netlify.app/)

[Backend Deploy](https://terraquest-5ye5.onrender.com)

Please note that the deployed links may not work as intended yet... They still need to be integrated together!

[Documentation](https://docs.google.com/document/d/1U3TmqffF8EQVwXoUP9U88xDnMpCyP3nO3NMakEZGK_0/edit?usp=sharing)


# **Contributing to Terraquest**  
Thank you for your interest in contributing to **Terraquest**! Please follow these guidelines to set up the project locally and submit a Pull Request (PR).

## **Instructions for Setting Up the Project Locally and Opening a PR**
1. **Fork the repository** on GitHub.  
2. **Clone the forked repository** to your local machine using the following command:  
   ```sh
   git clone <your-forked-repo-url>
   ```
3. Ensure that **Node.js and npm** are installed on your system. If not, refer to the [official installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).  
4. **Navigate to the cloned repository** in your terminal:  
   ```sh
   cd terraquest
   ```
5. **Install frontend dependencies**:  
   ```sh
   cd frontend
   npm install
   ```
6. **Install backend dependencies**:  
   ```sh
   cd ../backend
   npm install
   ```
7. **Start the frontend development server**:  
   ```sh
   cd ../frontend
   npm run dev
   ```
8. **Start the backend server**:  
   ```sh
   cd ../backend
   npm run server
   ```
9. **Make your changes** and test the functionality.  
10. **Lint and format your code** before committing:  
    ```sh
    npm run format:file <file-path>
    ```
11. **Commit your changes**:  
    ```sh
    git add .
    git commit -m "Describe your changes"
    git push origin <your-branch-name>
    ```
12. **Open a Pull Request (PR)** on GitHub from your forked repository to the main repository. (Please note that your PR must pass the Workflows assigned. If not your contribution cannot be merged. Please fix the issue and commit again.)  
13. Once reviewed, your changes will be merged. 🎉

🌏 *TerraQuest — made with ❤️ in India by ***[Mayur K Setty](https://github.com/mayur-driod)***.* All rights reserved!
