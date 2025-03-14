# **TerraQuest**  

## **Concept**  
This platform is inspired by **eBird** and **iNaturalist**, built to foster interest in **wildlife, conservation, birdwatching, and photography**. My passion for nature and technology drove me to create a space where enthusiasts can **log, track, and share** their observations while contributing to conservation efforts.  

### **Core Features:**  
📍 **Track & Log Sightings** – Users can submit observations of birds, mammals, insects, fungi, and plants.  
🗺️ **Trail Tracking** – Track movement in real-time or manually plot trails and submit multiple sightings.  
📸 **Media Uploads & Peer Reviews** – Users can add **images, audio, and video** to validate sightings, with community-driven **peer reviews** for accuracy.  
🏆 **Gamified Leaderboard** – Encourages users to explore more by ranking contributions.  
👥 **Community & Collaboration** – Engage in discussions, plan meetups, and get feedback on wildlife photography.  

---

(This is just the plan... It is subject to changes)

## **Tech Stack**  

### **Frontend (React + Vite)**  
- **Framework**: React.js with Vite (for fast performance)  
- **UI Library**: Tailwind CSS / ShadCN (modern and responsive UI)  
- **Maps & Geolocation**: Leaflet.js / Google Maps API (interactive mapping)  
- **File Storage**: Firebase Storage / Cloudinary (for media uploads)  
- **Authentication**: NextAuth.js / Firebase Auth (JWT & Google OAuth)  

### **Backend (Node.js + Express + MongoDB)**  
- **Framework**: Express.js (REST API development)  
- **Database**: MongoDB + Mongoose (flexible document storage)  
- **Authentication**: JWT-based authentication & Google OAuth  
- **Geospatial Queries**: MongoDB’s `$geoNear` (find nearby sightings & trails)  
- **API Integrations**: Google Maps API, eBird API, iNaturalist API (for future enhancements)  

### **Deployment & DevOps**  
- **Frontend Deployment**: Vercel / Netlify  
- **Backend Deployment**: Railway / Render / DigitalOcean  
- **Database Hosting**: MongoDB Atlas  
- **Storage**: Firebase Storage / Cloudinary  
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

[Documentation](https://docs.google.com/document/d/1U3TmqffF8EQVwXoUP9U88xDnMpCyP3nO3NMakEZGK_0/edit?usp=sharing)