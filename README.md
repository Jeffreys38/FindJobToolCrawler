# 🛠️ TopCV Crawler Tool

## 📄 Description
A Python-based tool that crawls and extracts public resume data from TopCV.vn for research and analysis purposes (e.g., job market trends, keyword extraction, and resume pattern study). The tool focuses on structured data extraction including name, skills, experiences, education, and more.

> ⚠️ For educational and personal research use only. Respect terms of service and privacy policies.

---

## 📦 Project Structure

├── data/ # Extracted job url from TopCV

├── detailsJob.json # Extracted job detail from job url

## ✅ Features
- Crawl public resume listing from TopCV
- Extract fields: name, experience, description, required, benefit, address, applyMethod, companyLogo
- Save structured data into JSON
- Easy to extend with keyword extraction or NLP

## 🧪 Sample Output (cleaned JSON)
```json
[
    {
        "name": "Project Coordinator (Lingerie Brand, US Market)",
        "experience": "2 năm",
        "description": "ABOUT THE ROLE\nCompany Overview:\nCrossian is a high-growth technology-driven e-commerce business. Behind our success is our people. As a start-up formed in 2020, we have created a fast-paced and dynamic environment, enabling our people to reach a cumulative average growth rate of over 400% in just under 3 years. Our mission now is to build direct-to-consumer brands and increase customer LTV.\nPosition Overview:\nAre you ready to be part of something extraordinary?\nDrawing from the achievements of our previous three years, Selless - the cross-border eCommerce platform serving thousands of online stores selling millions of products to millions of customers in the US, we are embarking on a progressive journey to assemble an ambitious squad team to build disruptive products aligned with the Direct-to-customer (DTC) business model to conquer the US market.\nWe're looking for a dynamic and motivated individual to join our team as a Product Admin / Project Coordinator. This is your chance to play an instrumental role in our exciting new venture, “build a new Lingerie Product Brand to conquer the US market”. As a Product Admin / Project Coordinator, you will be at the heart of ensuring the seamless execution of our project, providing invaluable support to various teams and stakeholders.\nWHAT YOU WILL DO\nAs a key player in our dynamic team, your contributions will be felt across the organization. Here's how you'll make a difference:\nTeam Coordination:\n  You'll be the driving force behind our internal collaboration. By organizing meetings, preparing agendas, and collating documents, you'll create an environment where our Product Owner (PO), Product Leader (PL), and Project Manager (PM) can communicate effortlessly and work together seamlessly.\nVendor Management:\n  Our external collaborators, Lingerie Designers (LD), and Models are essential to our success. You'll facilitate their onboarding, coordinate interviews and meetings, and work closely with the Product Owner to ensure that our project stays aligned with its goals.\nTimeline & Risk Monitoring:\n  We're on a mission to meet and exceed our project milestones. You'll be our vigilant guardian, monitoring timelines and proactively detecting potential risks. Your communication skills will be instrumental in developing contingency plans alongside the Product Leader and Product Owner.\nDocumentation:\n  Our knowledge is a valuable asset. You'll create, update, and maintain our project-related documents and knowledge repositories, ensuring that our information is organized and accessible to all relevant teams.\nCommunication:\n  Effective communication is at the heart of our success. You'll be the mastermind behind drafting and distributing timely project updates to internal stakeholders, ensuring that our teams stay well-informed and connected. You'll also serve as a central point of contact for project-related inquiries and information sharing.\nFeedback Management:\n  Feedback is the compass guiding us towards improvement. You'll collect, categorize, and distribute feedback from teams and other business partners, making it actionable for our Product Owner. Your collaboration with cross-functional teams will turn insights into transformative actions.",
        "required": "WHAT WE ARE LOOKING FOR\nWe value talent, dedication, and a commitment to growth. If you possess the following qualifications, you're already a step ahead:\nBachelor's degree in Business Administration, Marketing, or related majors.\n2 - 3 years of proven experience in project coordination or similar roles within a dynamic and fast-paced environment. Freshers are also welcome to apply, just show us how enthusiastic you are for this position.\nBeing able to use Jira is a Plus, and Jira Admin Certification is a competitive advantage.\nAble to use ChatGPT is highly preferred.\nExcellent organizational and time-management skills, with a keen eye for detail.\nStrong communication abilities, both written and verbal.\nProficiency in English is essential (IELTS = 7.0), and Chinese is a plus.\nAgile mindset, ability to work effectively within a diverse team, adapting to changing priorities.",
        "benefit": "WHAT YOU CAN EXPECT\nAt Crossian, our people are the key to our success. We believe in creating an attractive total compensation package (TCP) that not only retains employees but allows them to excel in their profession. These include:\nCareer Path: Devote, learn, and grow to become a Project Manager or Product Owner\nCompetitive salary\nFull salary during probation\n20 days of work-from-home & 12 days of paid annual leave\nGlobal health insurance package\nGuaranteed 13th-month salary\nQuarterly bonus and year-end bonus as part of our profit-sharing program\nA Pantry & a Crossian Cafe stocked with goodies, ready to serve\nLots of other company benefits including 5-star annual company trip, budget for frequent team building activities, and other monthly/quarterly/annual company events\nGeneral company T&D Program\nOther benefits in accordance with the Company's Policy and Vietnam Labor Laws",
        "address": "- Hà Nội: Tầng 5, Pax Sky, 63-65 Ngô Thì Nhậm, Hai Bà Trưng",
        "applyMethod": "Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.",
        "companyLogo": "https://cdn-new.topcv.vn/unsafe/80x/filters:format(webp)/https://static.topcv.vn/company_logos/crossian-viet-nam-5fa2778c7a288.jpg"
    },
...
```
