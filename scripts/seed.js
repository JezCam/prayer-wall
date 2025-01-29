require('dotenv').config()
const wpApiUrl = process.env.WORDPRESS_URL
const appUsername = process.env.WORDPRESS_APP_USERNAME
const appPassword = process.env.WORDPRESS_APP_PASSWORD

if (!wpApiUrl || !appUsername || !appPassword) {
  console.error('wpApiUrl or appUsername or appPasswod is missing');
  process.exit(1); // Exit the script if any environment variable is missing
}

async function seed() {
  const prayer_requests = [
    {
      "name": "Emma",
      "prayer_request": "Please pray for my family as we are going through a tough season. We need peace and guidance.",
      "email": "emma@example.com",
      "phone": "+61 412 345 678"
    },
    {
      "name": "James",
      "prayer_request": "Asking for prayers for healing from illness. It's been a difficult time, and I need strength to overcome.",
      "email": "james@example.com",
      "phone": "+61 423 456 789"
    },
    {
      "name": "Sarah",
      "prayer_request": "Please pray for my marriage. My spouse and I are struggling with communication and need God's help. We're trying hard, but it's tough. I know we need divine intervention.",
      "email": "sarah@example.com",
      "phone": "+61 434 567 890"
    },
    {
      "name": "Daniel",
      "prayer_request": "I need prayers for my job search. I'm looking for the right opportunity, one that aligns with my skills and passions.",
      "email": "daniel@example.com",
      "phone": "+61 445 678 901"
    },
    {
      "name": "Olivia",
      "prayer_request": "Please pray for my children. I want them to grow strong in their faith and make wise choices. Help me be a good guide for them.",
      "email": "olivia@example.com",
      "phone": "+61 456 789 012"
    },
    {
      "name": "Michael",
      "prayer_request": "Prayers for a close friend who is battling depression. They need peace and a way out of their struggles. It's been a long, difficult journey for them.",
      "email": "michael@example.com",
      "phone": "+61 467 890 123"
    },
    {
      "name": "Chloe",
      "prayer_request": "Praying for financial breakthrough. I'm in a tough spot and trusting that God will provide.",
      "email": "chloe@example.com",
      "phone": "+61 478 901 234"
    },
    {
      "name": "Liam",
      "prayer_request": "Please pray for my health. I've been feeling really fatigued, and I need strength to get through the day. I don't know how much longer I can keep going without help.",
      "email": "liam@example.com",
      "phone": "+61 489 012 345"
    },
    {
      "name": "Isabella",
      "prayer_request": "Pray for my business. I'm trying to expand, but it's been a challenge. I need wisdom and resources. I trust that God will guide me through this process.",
      "email": "isabella@example.com",
      "phone": "+61 490 123 456"
    },
    {
      "name": "Noah",
      "prayer_request": "Asking for prayers for my elderly parents. Their health is declining, and I need strength to care for them. It's been emotionally exhausting, and I need God's grace.",
      "email": "noah@example.com",
      "phone": "+61 501 234 567"
    },
    {
      "name": "Sophia",
      "prayer_request": "Please pray for me to find peace and clarity as I navigate a big life decision.",
      "email": "sophia@example.com",
      "phone": "+61 512 345 678"
    },
    {
      "name": "Ethan",
      "prayer_request": "Prayers for my friends who are going through personal struggles. They need encouragement and hope. I feel helpless at times, but I know prayer is powerful.",
      "email": "ethan@example.com",
      "phone": "+61 523 456 789"
    },
    {
      "name": "Grace",
      "prayer_request": "I need prayer for healing from a broken heart. It's been a tough time since my relationship ended. I'm trying to move forward, but I'm struggling with letting go.",
      "email": "grace@example.com",
      "phone": "+61 534 567 890"
    },
    {
      "name": "Jacob",
      "prayer_request": "Please pray for my anxiety. I struggle with worry and fear, and I need peace that only God can give. I know I need to trust Him more.",
      "email": "jacob@example.com",
      "phone": "+61 545 678 901"
    },
    {
      "name": "Mia",
      "prayer_request": "Pray for my upcoming exams. I need wisdom, focus, and clarity to do my best. I'm feeling overwhelmed, but I trust that God will help me.",
      "email": "mia@example.com",
      "phone": "+61 556 789 012"
    },
    {
      "name": "Alexander",
      "prayer_request": "I'm going through a financial hardship. Please pray that I can manage my bills and provide for my family. It's a really stressful time, and I need God's provision.",
      "email": "alexander@example.com",
      "phone": "+61 567 890 123"
    },
    {
      "name": "Ava",
      "prayer_request": "Please pray for my mental health. I have been dealing with depression, and I need strength to overcome it. It's been difficult, and I feel drained most days.",
      "email": "ava@example.com",
      "phone": "+61 578 901 234"
    },
    {
      "name": "Samuel",
      "prayer_request": "I'm asking for prayer for healing from a recent surgery. The recovery has been slow, and I need strength. I believe in the power of prayer and trust that God will heal me.",
      "email": "samuel@example.com",
      "phone": "+61 589 012 345"
    },
    {
      "name": "Ella",
      "prayer_request": "Pray for my son who is struggling with school. He's having a hard time focusing and staying motivated. I'm concerned about his future, and I need God's wisdom to guide him.",
      "email": "ella@example.com",
      "phone": "+61 590 123 456"
    },
    {
      "name": "Jack",
      "prayer_request": "Please pray for my friend who is going through a tough time. They need hope and encouragement. I know that God's love is greater than their struggles.",
      "email": "jack@example.com",
      "phone": "+61 601 234 567"
    }
  ]
  

  for (const request of prayer_requests) {
    const postData = {
      title: request.name,
      content: request.prayer_request,
      status: 'publish', // Publish immediately or 'draft' for draft
      acf: {
        email: request.email,
        phone: request.phone,
      },
    }

    const response = await fetch(wpApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${appUsername}:${appPassword}`).toString('base64')}`,
      },
      body: JSON.stringify(postData),
    })
  
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create prayer request')
    }
  }
}

seed()
