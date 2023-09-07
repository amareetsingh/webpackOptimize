import { STRIPE_KEY, STARTER_PRODUCT_ID, ESSENTIALS_PRODUCT_ID, ADVANCED_PRODUCT_ID } from "../Components/API";

/** Stripe publishable key */
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || STRIPE_KEY;
//pk_test_UKxlIF3ODSa7SLSVbwHiwEa2
/** Stripe product plan ids */

//const BASIC_PRODUCT_ID = process.env.BASIC_PRODUCT_ID || 'prod_IlqWdHCbXu7j7Q';
//const STANDARD_PRODUCT_ID = process.env.STANDARD_PRODUCT_ID || 'prod_IlqWdHCbXu7j7Q';
//const PREMIUM_PRODUCT_ID = process.env.PREMIUM_PRODUCT_ID;
//const ENTERPRISE_PRODUCT_ID = process.env.ENTERPRISE_PRODUCT_ID;

/** Stripe product plans */
export const PRODUCT_PLANS = [

  {
    id: STARTER_PRODUCT_ID,
    name: "STARTER",
    desc: "Perfect to start with. Assess the current state of affairs. Great for funnel building.",
    featuresList: ["Simple, transparent pricing.", "Online, no-hassle cancellation", "Embed on your own website", "Personalize & engage",  " * ","1 assessment", "Single user", "Email capture & integration", "Unlimited unique clients", "50 total responses monthly"],
    waiting:false,
    original: 8.95,
    price: 6.95
  },
  {
    id: ESSENTIALS_PRODUCT_ID,
    name: "ESSENTIALS",
    desc: "Take the next step. Assess the current state + take action collaboratively.",
    featuresList: ["Simple, transparent pricing.", "Online, no-hassle cancellation", "Embed on your own website", "Personalize & engage", " * ","Unlimited assessments", "Single user", "Email capture & integration", "Unlimited unique clients" ,"200 total responses monthly", "Respondent profile fields", "Collaborate with goals", "Before & after analysis" ],
    waiting:false,
    original: 16.95,
    price: 11.95
  }/*,
  {
    id: ADVANCED_PRODUCT_ID,
    name: "ADVANCED",
    desc: "Perfect when you work with groups, not just individuals. Set goals, and achieve them together.",
    featuresList: ["Simple, transparent pricing.", "Online, no-hassle cancellation", "Embed on your own website", "Personalize & engage", " * ","Unlimited assessments", "5 users, ability to add more", "Email capture & integration", "Unlimited unique clients" ,"500 total responses monthly", "Respondent profile fields", "Collaborate with goals", "Before & after analysis", "On behalf of", "Organize clients in groups"],
    waiting:true,
    original: 0,
    price: 0
  },*/
  // {
  //   id: PREMIUM_PRODUCT_ID,
  //   name: "Professional",
  //   featuresList: ["Simple, transparent pricing.","Online, no-hassle cancellation","Customize & embed on your own website","Start personalizing your client engagement"],
  //   waiting:true,
  //   price: 21.95
  // },
  // {
  //   id: ENTERPRISE_PRODUCT_ID,
  //   name: "Enterprise",
  //   featuresList: ["Simple, transparent pricing.","Online, no-hassle cancellation","Customize & embed on your own website","Start personalizing your client engagement"],
  //   price: 49.99,
  //   waiting:true,
  // }
];



/** Stripe product plans */
export const NEW_PRODUCT_PLANS = [
  {
    id: "",
    name: "Features",
    desc: "Perfect to start with. Assess the current state of affairs. Great for funnel building.",
    featuresList: [
      "# of quizzes / expert assessments", 
      "# of users",
      "# of leads generated / new submissions per month*", 
      "Quick start templates",
      "Email address capture",
      "Email marketing integration (e.g. Hubspot, Mailchimp)", 
      "CRM integration (e.g. Salesforce, Pipedrive, Hubspot)", 
      "Personality or Type assessments - DISC, BIG 5, Human Design, or custom",
      "Wheel of Life, life, health, business etc.",
      "Scored assessments / Maturity model",
      "Use giveaways and incentives",
      "Group questions into categories / dimensions",      
      "Works on PC, Mac & mobile", 
      "24 / 7 Email support", 
      "Customize colors and match your branding", 

      "Goal setting and tracking",
      "Before & after analysis",
      "Profile benchmarking",
      "Invitation only responses",
      "Take quiz on-behalf-of",
      "Multi-stakeholder clients / accounts*",
      "Multi-assessment analysis"
    ],
    waiting:false,
    original: "",
    price: ""
  },
  {
    id: STARTER_PRODUCT_ID,
    name: "STARTER",
    highlighted: "",
    desc: "Start generating leads and data-driven thought leaership content in 30 minutes. Great for top of the funnel engagement.",
    waiting:false,
    original: 8.95,
    pricesmall:95,
    pricelarge: 6,
    featuresList: [
      "1", 
      "1", 
      "20", 
      "Y",
      "Y",
      "Y", 
      "Y", 
      "Y",
      "Y",
      "Y",
      "Y",
      "Y",      
      
      "Y", 
      "Y", 
      "Y", 
      

      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  {
    id: ESSENTIALS_PRODUCT_ID,
    name: "ESSENTIALS",
    highlighted: "Y",
    desc: "Upgrade. More assessments/quizzes, more leads generated per month, and more material for data-driven thought leadership content.",
    waiting:false,
    original: 16.95,
    price: 11.95,
    pricesmall: 95,
    pricelarge: 11,
    featuresList: [
      "5", 
      "1", 
      "100",
      "Y",
      "Y",
      "Y", 
      "Y", 
      "Y",
      "Y",
      "Y",
      "Y",
      "Y",
      "Y", 
      "Y", 
      "Y", 
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  {
    id: ADVANCED_PRODUCT_ID,
    name: "ADVANCED",
    highlighted: "",
    desc: "Start engaging clients in personalized goals-driven sales pursuits and create systematic existing client account growth.",
    waiting:false,
    original: 39.95,
    price: 29.95,
    pricesmall: 95,
    pricelarge: 29,
    featuresList: [
      "Unlimited",
      "3", 
      "500",
      "Y",
      "Y",       
      "Y", 
      "Y", 
      "Y",
      "Y",
      "Y",
      "Y",
      "Y",
      
      "Y", 
      "Y", 
      "Y", 
 
      "Y",
      "Y",
      "Y",
      "Y",
      "Y",
      "5 included*",
      "Y"
    ]

  }







  // {
  //   id: PREMIUM_PRODUCT_ID,
  //   name: "Professional",
  //   featuresList: ["Simple, transparent pricing.","Online, no-hassle cancellation","Customize & embed on your own website","Start personalizing your client engagement"],
  //   waiting:true,
  //   price: 21.95
  // },
  // {
  //   id: ENTERPRISE_PRODUCT_ID,
  //   name: "Enterprise",
  //   featuresList: ["Simple, transparent pricing.","Online, no-hassle cancellation","Customize & embed on your own website","Start personalizing your client engagement"],
  //   price: 49.99,
  //   waiting:true,
  // }
];

