const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const faqs = [
  { keywords: ['send photo', 'whatsapp'], answer: 'Open WhatsApp > Tap on the paperclip icon > Choose Gallery > Select photo > Send.' },
  { keywords: ['make payment', 'google pay'], answer: 'Open Google Pay > Tap Pay > Select contact or enter UPI ID > Enter amount > Tap Pay.' },
  { keywords: ['check balance', 'paytm'], answer: 'Open Paytm > Tap on Balance & History > Enter your passcode > Your balance will be shown.' },
  { keywords: ['reset password', 'gmail'], answer: 'Go to Gmail > Click "Forgot Password" > Follow the verification steps to reset.' },
  { keywords: ['screenshot', 'windows'], answer: 'Press Windows + Shift + S to take a screenshot and select the area.' },
  { keywords: ['update app', 'play store'], answer: 'Open Play Store > Tap on your profile > Manage apps & device > Update available.' },
  { keywords: ['delete', 'instagram account'], answer: 'Go to Instagram Help > Delete your account page > Log in > Choose reason > Permanently delete.' },
  { keywords: ['recharge', 'mobile'], answer: 'You can recharge your mobile using apps like Paytm, PhonePe, or directly via your mobile provider website.' },
  { keywords: ['turn on', 'location'], answer: 'Swipe down the notification bar > Tap on Location icon to turn it on.' },
  { keywords: ['create', 'email'], answer: 'Visit gmail.com > Click "Create account" > Fill in your details and verify.' },
  { keywords: ['hi'], answer: 'Hello, whats on your mind today?' },
  { keywords: ['hello'], answer: 'Hi, whats on your mind today?' },
  { keywords: ['what','are','you?'], answer: 'I am an AI chatbot made for making your daily internet tasks easy.' },
  { keywords: ['instagram?'], answer: 'Instagram is a popular social media platform that allows users to share photos and videos, either publicly or privately. It also features tools for editing and enhancing media, as well as features like Stories and Reels. Users can follow others and engage with their content through likes, comments, and direct messages.' },
  { keywords: ['google?'], answer: 'Google is a multinational technology company primarily known for its search engine, but it also offers a wide range of products and services including online advertising, cloud computing, software, and hardware. It is a leading subsidiary of Alphabet Inc, a conglomerate that owns various businesses, including Google.' },
  { keywords: ['chatgpt?'], answer: 'ChatGPT, developed by OpenAI, was publicly released on November 30, 2022. Initially released as a "research preview", it quickly gained popularity and became the fastest-growing consumer application in history. It started as a nonprofit company in 2015 but became for-profit in 2019. Its CEO is Sam Altman, who also co-founded the company. OpenAI released ChatGPT as a free “research preview” in November 2022.' },
  { keywords: ['youtube?'], answer: 'YouTube is a popular, global online video sharing platform where users can upload, watch, and share videos. It is owned by Google and is a significant part of online culture, offering a wide range of content from entertainment and education to business and personal expression. YouTube is free to use, though a premium version with extra features is also available. ' },
  { keywords: ['when', 'instagram','made'], answer: 'Instagram was officially launched on October 6, 2010. It was created by Kevin Systrom and Mike Krieger and initially focused on mobile photo sharing, quickly gaining popularity.' },
  { keywords: ['when','google','made'], answer: 'Google was officially launched in 1998 by Larry Page and Sergey Brin to market Google Search, which has become the most used web-based search engine. Larry Page and Sergey Brin, students at Stanford University in California, developed a search algorithm first (1996) known as "BackRub", with the help of Scott Hassan and Alan Steremberg. The search engine soon proved successful, and the expanding company moved several times, finally settling at Mountain View in 2003. This marked a phase of rapid growth, with the company making its initial public offering in 2004 and quickly becoming one of the worlds largest media companies. The company launched Google News in 2002, Gmail in 2004, Google Maps in 2005, Google Chrome in 2008, and the social network known as Google+ in 2011 (which was shut down in April 2019), in addition to many other products. In 2015, Google became the main subsidiary of the holding company Alphabet Inc.'},
  { keywords: ['when','youtube', 'made'], answer: 'YouTube was founded on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim, three former employees of PayPal. Headquartered in San Bruno, California, it is the second-most-visited website in the world, after Google Search. In January 2024, YouTube had more than 2.7 billion monthly active users, who collectively watched more than one billion hours of videos every day. As of May 2019, videos were being uploaded to the platform at a rate of more than 500 hours of content per minute, and as of mid-2024, there were approximately 14.8 billion videos in total. On November 13, 2006, YouTube was purchased by Google for $1.65 billion (equivalent to $2.39 billion in 2024). Google expanded YouTubes business model of generating revenue from advertisements alone, to offering paid content such as movies and exclusive content produced by and for YouTube. It also offers YouTube Premium, a paid subscription option for watching content without ads. YouTube incorporated Googles AdSense program, generating more revenue for both YouTube and approved content creators. In 2023, YouTubes advertising revenue totaled $31.7 billion, a 2% increase from the $31.1 billion reported in 2022. From Q4 2023 to Q3 2024, YouTubes combined revenue from advertising and subscriptions exceeded $50 billion.' }
];

sendBtn.addEventListener('click', () => {
  const userMsg = userInput.value.trim();
  if (userMsg === '') return;

  displayMessage(userMsg, 'user-message');
  userInput.value = '';

  const reply = getBotReply(userMsg.toLowerCase());
  setTimeout(() => {
    displayMessage(reply, 'bot-message');
  }, 600);
});

function displayMessage(message, className) {
  const msgElem = document.createElement('div');
  msgElem.className = className;
  msgElem.textContent = message;
  chatWindow.appendChild(msgElem);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getBotReply(message) {
  for (const item of faqs) {
    if (item.keywords.every(keyword => message.includes(keyword))) {
      return item.answer;
    }
  }
  return "I'm still learning! Wanna teach me this one?";
}

const micBtn = document.createElement('button');
micBtn.textContent = '🎤';
micBtn.style.marginLeft = '8px';
micBtn.style.padding = '10px 12px';
micBtn.style.borderRadius = '6px';
micBtn.style.border = 'none';
micBtn.style.background = '#6c63ff';
micBtn.style.color = 'white';
micBtn.style.cursor = 'pointer';
micBtn.title = 'Speak';

document.querySelector('.chat-input-area').appendChild(micBtn);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  micBtn.onclick = () => {
    recognition.start();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendBtn.click();
  };
}
