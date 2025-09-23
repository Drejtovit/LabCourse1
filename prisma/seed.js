import prisma from '../lib/db.js';
import { hash } from 'bcryptjs';

async function main() {
    console.log('🌱 Starting database seed...')

    const hashedPassword = await hash('Test123?', 10)

    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'ADMIN',
            phoneNumber: {
                create: {
                    number: '+38345816206'
                }
            },
            admin: {
                create: {}
            }
        }
    })

    const employer1 = await prisma.user.create({
        data: {
            name: 'TechCorp Solutions',
            email: 'techcorpsolutions@gmail.com',
            password: hashedPassword,
            role: 'EMPLOYER',
            phoneNumber: {
                create: {
                    number: '+38344123123'
                }
            },
            employer: {
                create: {
                    description: 'Leading technology solutions company specializing in enterprise software development and digital transformation.',
                    websiteUrl: 'https://techcorp-ks.com',
                    zip: '10000',
                    city: 'Prishtina',
                    state: 'Kosovo'
                }
            }
        }
    })

    const employer2 = await prisma.user.create({
        data: {
            name: 'InnovateLabs',
            email: 'innovatelabs.ks@gmail.com',
            password: hashedPassword,
            role: 'EMPLOYER',
            phoneNumber: {
                create: {
                    number: '+38349111222'
                }
            },
            employer: {
                create: {
                    description: 'Cutting-edge research and development company focused on AI and machine learning solutions.',
                    websiteUrl: 'https://innovatelabs-ks.com',
                    zip: '20000',
                    city: 'Prizren',
                    state: 'Kosovo'
                }
            }
        }
    })

    const employer3 = await prisma.user.create({
        data: {
            name: 'Digital Marketing Pro',
            email: 'digitalmarketingpro.ks@gmail.com',
            password: hashedPassword,
            role: 'EMPLOYER',
            phoneNumber: {
                create: {
                    number: '+38345123456'
                }
            },
            employer: {
                create: {
                    description: 'Full-service digital marketing agency helping businesses grow their online presence.',
                    websiteUrl: 'https://digitalmarketingpro-ks.com',
                    zip: '30000',
                    city: 'Peja',
                    state: 'Kosovo'
                }
            }
        }
    })

    const employer4 = await prisma.user.create({
        data: {
            name: 'Green Energy Solutions',
            email: 'greenenergysolutions.ks@gmail.com',
            password: hashedPassword,
            role: 'EMPLOYER',
            phoneNumber: {
                create: {
                    number: '+38349123456'
                }
            },
            employer: {
                create: {
                    description: 'Providing sustainable energy solutions for a cleaner future.',
                    websiteUrl: 'https://greenenergysolutions-ks.com',
                    zip: '40000',
                    city: 'Gjakova',
                    state: 'Kosovo'
                }
            }
        }
    })

    const employer5 = await prisma.user.create({
        data: {
            name: 'FinTech Global',
            email: 'anilahadri@gmail.com',
            password: hashedPassword,
            role: 'EMPLOYER',
            phoneNumber: {
                create: {
                    number: '+38348123456'
                }
            },
            employer: {
                create: {
                    description: 'Innovative financial technology company revolutionizing online payments.',
                    websiteUrl: 'https://fintechglobal-ks.com',
                    zip: '50000',
                    city: 'Mitrovica',
                    state: 'Kosovo'
                }
            }
        }
    })

    const candidate1 = await prisma.user.create({
        data: {
            name: 'Arben Krasniqi',
            email: 'arben.krasniqi@gmail.com',
            password: hashedPassword,
            role: 'CANDIDATE',
            phoneNumber: {
                create: {
                    number: '+38344111222'
                }
            },
            candidate: {
                create: {
                    birthDate: new Date('1990-05-15'),
                    zip: '10000',
                    city: 'Prishtina',
                    state: 'Kosovo'
                }
            }
        }
    })

    const candidate2 = await prisma.user.create({
        data: {
            name: 'Blerta Gashi',
            email: 'blerta.gashi@gmail.com',
            password: hashedPassword,
            role: 'CANDIDATE',
            phoneNumber: {
                create: {
                    number: '+38349123456'
                }
            },
            candidate: {
                create: {
                    birthDate: new Date('1992-08-22'),
                    zip: '20000',
                    city: 'Prizren',
                    state: 'Kosovo'
                }
            }
        }
    })

    const candidate3 = await prisma.user.create({
        data: {
            name: 'Rron Drejta',
            email: 'rron.drejta@gmail.com',
            password: hashedPassword,
            role: 'CANDIDATE',
            phoneNumber: {
                create: {
                    number: '+38345123456'
                }
            },
            candidate: {
                create: {
                    birthDate: new Date('2005-04-28'),
                    zip: '30000',
                    city: 'Peja',
                    state: 'Kosovo'
                }
            }
        }
    })

    const candidate4 = await prisma.user.create({
        data: {
            name: 'Anila Hadri',
            email: 'anila.hadri@gmail.com',
            password: hashedPassword,
            role: 'CANDIDATE',
            phoneNumber: {
                create: {
                    number: '+38349111223'
                }
            },
            candidate: {
                create: {
                    birthDate: new Date('2005-10-19'),
                    zip: '40000',
                    city: 'Gjakova',
                    state: 'Kosovo'
                }
            }
        }
    })

    const candidate5 = await prisma.user.create({
        data: {
            name: 'Luan Shala',
            email: 'luan.shala@gmail.com',
            password: hashedPassword,
            role: 'CANDIDATE',
            phoneNumber: {
                create: {
                    number: '+38348123457'
                }
            },
            candidate: {
                create: {
                    birthDate: new Date('1993-11-25'),
                    zip: '50000',
                    city: 'Mitrovica',
                    state: 'Kosovo'
                }
            }
        }
    })


    const skills = await Promise.all([
        prisma.skill.create({ data: { name: 'JavaScript' } }),
        prisma.skill.create({ data: { name: 'React' } }),
        prisma.skill.create({ data: { name: 'Node.js' } }),
        prisma.skill.create({ data: { name: 'Python' } }),
        prisma.skill.create({ data: { name: 'SQL' } }),
        prisma.skill.create({ data: { name: 'HTML/CSS' } }),
        prisma.skill.create({ data: { name: 'TypeScript' } }),
        prisma.skill.create({ data: { name: 'AWS' } }),
        prisma.skill.create({ data: { name: 'Docker' } }),
        prisma.skill.create({ data: { name: 'Git' } }),
        prisma.skill.create({ data: { name: 'Machine Learning' } }),
        prisma.skill.create({ data: { name: 'Data Analysis' } }),
        prisma.skill.create({ data: { name: 'Digital Marketing' } }),
        prisma.skill.create({ data: { name: 'SEO' } }),
        prisma.skill.create({ data: { name: 'Content Marketing' } })
    ])

    const currentDate = new Date()
    const futureDate = new Date()
    futureDate.setMonth(currentDate.getMonth() + 2)

    const job1 = await prisma.job.create({
        data: {
            title: 'Senior Full Stack Developer',
            type: 'FULL_TIME',
            description: 'We are looking for an experienced Full Stack Developer to join our growing team. You will develop and maintain web applications using modern technologies like React, Node.js, and cloud services.',
            closingDate: futureDate,
            employerId: employer1.id
        }
    })

    const job2 = await prisma.job.create({
        data: {
            title: 'Frontend React Developer',
            type: 'FULL_TIME',
            description: 'Join our frontend team to build beautiful and responsive user interfaces. Work with Next.js, TypeScript, and modern CSS frameworks.',
            closingDate: futureDate,
            employerId: employer1.id
        }
    })

    const job3 = await prisma.job.create({
        data: {
            title: 'AI/ML Engineer',
            type: 'FULL_TIME',
            description: 'Exciting opportunity to work on cutting-edge AI and machine learning projects. Experience with Python, TensorFlow/PyTorch required.',
            closingDate: futureDate,
            employerId: employer2.id
        }
    })

    const job4 = await prisma.job.create({
        data: {
            title: 'Data Scientist',
            type: 'FULL_TIME',
            description: 'Seeking a Data Scientist to extract insights from complex datasets and build predictive models.',
            closingDate: futureDate,
            employerId: employer2.id
        }
    })

    const job5 = await prisma.job.create({
        data: {
            title: 'Digital Marketing Specialist',
            type: 'PART_TIME',
            description: 'Manage social media, create content, optimize SEO, and analyze campaign performance.',
            closingDate: futureDate,
            employerId: employer3.id
        }
    })

    const job6 = await prisma.job.create({
        data: {
            title: 'Freelance Web Developer',
            type: 'CONTRACT',
            description: 'Build custom websites and web applications for various clients. Flexible schedule and remote work options.',
            closingDate: futureDate,
            employerId: employer3.id
        }
    })

    const job7 = await prisma.job.create({
        data: {
            title: 'Sustainability Consultant',
            type: 'FULL_TIME',
            description: 'Advise clients on renewable energy solutions and sustainability strategies. Knowledge of solar/wind technologies preferred.',
            closingDate: futureDate,
            employerId: employer4.id
        }
    })

    const job8 = await prisma.job.create({
        data: {
            title: 'Energy Analyst',
            type: 'FULL_TIME',
            description: 'Analyze energy consumption patterns and develop reports to optimize efficiency for commercial projects.',
            closingDate: futureDate,
            employerId: employer4.id
        }
    })

    const job9 = await prisma.job.create({
        data: {
            title: 'FinTech Software Engineer',
            type: 'FULL_TIME',
            description: 'Develop financial technology applications with secure payment systems and banking APIs.',
            closingDate: futureDate,
            employerId: employer5.id
        }
    })

    const job10 = await prisma.job.create({
        data: {
            title: 'Blockchain Developer',
            type: 'CONTRACT',
            description: 'Work on blockchain-based payment and ledger systems. Experience with Ethereum or similar platforms is required.',
            closingDate: futureDate,
            employerId: employer5.id
        }
    })

    const resume1 = await prisma.resume.create({
        data: {
            profession: 'Full Stack Developer',
            age: 33,
            details: 'Experienced full stack developer with 8+ years in web development. Specializes in React, Node.js, and cloud architecture. Passionate about building scalable applications and mentoring junior developers.',
            candidate: {
                connect: { candidateId: candidate1.id }
            },
            isActive: true,
            educations: {
                create: [
                    {
                        degree: 'Bachelor of Science',
                        fieldOfStudy: 'Computer Science',
                        school: 'University of Prishtina',
                        startDate: 2008,
                        endDate: 2012,
                        description: 'Graduated with a focus on software engineering and algorithms.'
                    }
                ]
            },
            experiences: {
                create: [
                    {
                        companyName: 'TechCorp Solutions',
                        professionTitle: 'Senior Full Stack Developer',
                        startDate: 2020,
                        endDate: null,
                        description: 'Lead development of web applications using React, Node.js, and AWS. Mentored junior developers.'
                    },
                    {
                        companyName: 'Digital Solutions Ltd.',
                        professionTitle: 'Full Stack Developer',
                        startDate: 2016,
                        endDate: 2020,
                        description: 'Developed and maintained multiple client projects. Collaborated with design teams to implement responsive UIs.'
                    }
                ]
            }
        }
    })

    const resume2 = await prisma.resume.create({
        data: {
            profession: 'AI/ML Engineer',
            age: 31,
            details: 'Machine Learning Engineer with strong background in data science and AI model development. Experienced in Python, TensorFlow, and cloud deployment of ML solutions.',
            candidate: {
                connect: { candidateId: candidate2.id }
            },
            isActive: true,
            educations: {
                create: [
                    {
                        degree: 'Master of Science',
                        fieldOfStudy: 'Data Science',
                        school: 'University of Prishtina',
                        startDate: 2014,
                        endDate: 2016,
                        description: 'Specialized in machine learning algorithms and statistical analysis.'
                    },
                    {
                        degree: 'Bachelor of Science',
                        fieldOfStudy: 'Mathematics',
                        school: 'University of Prizren',
                        startDate: 2010,
                        endDate: 2014,
                        description: 'Strong foundation in mathematics and statistics.'
                    }
                ]
            },
            experiences: {
                create: [
                    {
                        companyName: 'InnovateLabs',
                        professionTitle: 'Senior ML Engineer',
                        startDate: 2019,
                        endDate: null,
                        description: 'Developed and deployed machine learning models for predictive analytics.'
                    },
                    {
                        companyName: 'Data Analytics Inc.',
                        professionTitle: 'Data Scientist',
                        startDate: 2016,
                        endDate: 2019,
                        description: 'Built statistical models and performed data analysis for various business intelligence projects.'
                    }
                ]
            }
        }
    })

    const resume3 = await prisma.resume.create({
        data: {
            profession: 'Digital Marketing Specialist',
            age: 35,
            details: 'Creative digital marketing professional with 10+ years of experience in SEO, content marketing, and social media management. Proven track record of increasing online engagement and conversions.',
            candidate: {
                connect: { candidateId: candidate3.id }
            },
            isActive: true,
            educations: {
                create: [
                    {
                        degree: 'Bachelor of Arts',
                        fieldOfStudy: 'Marketing',
                        school: 'University of Prizren',
                        startDate: 2005,
                        endDate: 2009,
                        description: 'Focused on digital marketing strategies and consumer behavior.'
                    }
                ]
            },
            experiences: {
                create: [
                    {
                        companyName: 'Digital Marketing Pro',
                        professionTitle: 'Senior Digital Marketing Manager',
                        startDate: 2018,
                        endDate: null,
                        description: 'Lead digital marketing campaigns for 20+ clients, managing budgets up to $100k monthly. Increased client ROI by average of 40%.'
                    },
                    {
                        companyName: 'E-commerce Solutions',
                        professionTitle: 'Digital Marketing Specialist',
                        startDate: 2013,
                        endDate: 2018,
                        description: 'Managed SEO, PPC, and content marketing for e-commerce platforms. Grew organic traffic by 300% over 5 years.'
                    }
                ]
            }
        }
    })

    const resume4 = await prisma.resume.create({
        data: {
            profession: 'Software Developer',
            age: 19,
            details: 'Junior software developer passionate about frontend and backend development. Eager to learn and contribute to real projects.',
            candidate: {
                connect: { candidateId: candidate4.id }
            },
            isActive: true,
            educations: {
                create: [
                    {
                        degree: 'High School Diploma',
                        fieldOfStudy: 'Science',
                        school: 'Gjakova High School',
                        startDate: 2020,
                        endDate: 2024,
                        description: 'Focused on computer science and mathematics.'
                    }
                ]
            },
            experiences: {
                create: []
            }
        }
    })

    const resume5 = await prisma.resume.create({
        data: {
            profession: 'Frontend Developer',
            age: 31,
            details: 'Frontend developer with experience in React, HTML/CSS, and JavaScript. Enjoys building interactive web interfaces.',
            candidate: {
                connect: { candidateId: candidate5.id }
            },
            isActive: true,
            educations: {
                create: [
                    {
                        degree: 'Bachelor of Science',
                        fieldOfStudy: 'Computer Science',
                        school: 'University of Mitrovica',
                        startDate: 2011,
                        endDate: 2015,
                        description: 'Studied software engineering and web development.'
                    }
                ]
            },
            experiences: {
                create: [
                    {
                        companyName: 'TechCorp Solutions',
                        professionTitle: 'Frontend Developer',
                        startDate: 2016,
                        endDate: 2021,
                        description: 'Developed interactive web interfaces using React and modern CSS frameworks.'
                    }
                ]
            }
        }
    })

    await prisma.skillsOnResumes.createMany({
        data: [
            { resumeId: resume1.id, skillId: skills[0].id, proficiencyLevel: 90 },
            { resumeId: resume1.id, skillId: skills[1].id, proficiencyLevel: 95 },
            { resumeId: resume1.id, skillId: skills[2].id, proficiencyLevel: 85 },
            { resumeId: resume1.id, skillId: skills[4].id, proficiencyLevel: 80 },
            { resumeId: resume1.id, skillId: skills[5].id, proficiencyLevel: 90 },
            { resumeId: resume1.id, skillId: skills[6].id, proficiencyLevel: 85 },
            { resumeId: resume1.id, skillId: skills[7].id, proficiencyLevel: 75 },
            { resumeId: resume1.id, skillId: skills[9].id, proficiencyLevel: 90 },

            { resumeId: resume2.id, skillId: skills[3].id, proficiencyLevel: 95 },
            { resumeId: resume2.id, skillId: skills[10].id, proficiencyLevel: 90 },
            { resumeId: resume2.id, skillId: skills[11].id, proficiencyLevel: 85 },
            { resumeId: resume2.id, skillId: skills[4].id, proficiencyLevel: 80 },
            { resumeId: resume2.id, skillId: skills[7].id, proficiencyLevel: 75 },
            { resumeId: resume2.id, skillId: skills[9].id, proficiencyLevel: 85 },

            { resumeId: resume3.id, skillId: skills[12].id, proficiencyLevel: 95 },
            { resumeId: resume3.id, skillId: skills[13].id, proficiencyLevel: 90 },
            { resumeId: resume3.id, skillId: skills[14].id, proficiencyLevel: 85 },
            { resumeId: resume3.id, skillId: skills[5].id, proficiencyLevel: 75 },

            { resumeId: resume5.id, skillId: skills[0].id, proficiencyLevel: 85 },
            { resumeId: resume5.id, skillId: skills[1].id, proficiencyLevel: 85 },
            { resumeId: resume5.id, skillId: skills[5].id, proficiencyLevel: 80 },
            { resumeId: resume5.id, skillId: skills[6].id, proficiencyLevel: 75 },
            { resumeId: resume5.id, skillId: skills[9].id, proficiencyLevel: 85 },
        ]
    })
    await prisma.application.createMany({
        data: [
            { jobId: job1.id, candidateId: candidate1.id, status: 'PENDING' },
            { jobId: job1.id, candidateId: candidate5.id, status: 'ACCEPTED' },
            { jobId: job2.id, candidateId: candidate5.id, status: 'PENDING' },
            { jobId: job2.id, candidateId: candidate1.id, status: 'ACCEPTED' },
            { jobId: job3.id, candidateId: candidate2.id, status: 'PENDING' },
            { jobId: job3.id, candidateId: candidate4.id, status: 'ACCEPTED' },
            { jobId: job4.id, candidateId: candidate2.id, status: 'ACCEPTED' },
            { jobId: job4.id, candidateId: candidate3.id, status: 'PENDING' },
            { jobId: job5.id, candidateId: candidate3.id, status: 'PENDING' },
            { jobId: job5.id, candidateId: candidate4.id, status: 'ACCEPTED' },
            { jobId: job6.id, candidateId: candidate1.id, status: 'PENDING' },
            { jobId: job6.id, candidateId: candidate5.id, status: 'ACCEPTED' }
        ]
    })

    // // Create some Notifications
    // await prisma.notifications.createMany({
    //     data: [
    //         {
    //             title: 'New Job Application',
    //             message: 'You have received a new application for Senior Full Stack Developer position.',
    //             status: 'PENDING',
    //             createdAt: new Date(),
    //             typeModel: 'Job',
    //             typeId: job1.id
    //         },
    //         {
    //             title: 'Application Accepted',
    //             message: 'Your application for AI/ML Engineer position has been accepted!',
    //             status: 'ACCEPTED',
    //             createdAt: new Date(),
    //             typeModel: 'Application',
    //             typeId: job3.id
    //         },
    //         {
    //             title: 'New Job Posted',
    //             message: 'A new job matching your skills has been posted: Frontend React Developer',
    //             status: 'PENDING',
    //             createdAt: new Date(),
    //             typeModel: 'Job',
    //             typeId: job2.id
    //         }
    //     ]
    // })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('Error seeding database:', e)
        await prisma.$disconnect()
        process.exit(1)
    })