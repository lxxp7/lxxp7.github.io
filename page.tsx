import Link from "next/link"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function ProjectsPage() {
    const projects = [
        {
            id: "dwarf-studio",
            title: "Stage Dwarf Animation Studio",
            description: "Implémentation d'une fonctionnalité de LookDev dans Unreal Engine",
            image: "/placeholder.svg?height=400&width=600",
            href: "/projects/dwarf-studio"
        },
        {
            id: "internship-management",
            title: "Site de gestion des stages",
            description: "Application web PHP pour la gestion des stages",
            image: "/placeholder.svg?height=400&width=600",
            href: "/projects/internship-management"
        },
        {
            id: "aventuriers-rail",
            title: "Les Aventuriers du rail",
            description: "Jeu de société développé en Java/JavaFX",
            image: "/placeholder.svg?height=400&width=600",
            href: "/projects/aventuriers-rail"
        },
        {
            id: "mastermind",
            title: "Mastermind",
            description: "Implémentation du jeu Mastermind en Java",
            image: "/placeholder.svg?height=400&width=600",
            href: "/projects/mastermind"
        }
    ]

    return (
        <div className="min-h-screen bg-[rgba(229,226,232,0.65)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 hover:text-[#b39ec7] transition-colors">
                    Projets réalisés
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <Link key={project.id} href={project.href}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="h-full"
                            >
                                <Card className="overflow-hidden h-full transition-shadow hover:shadow-xl">
                                    <div className="relative group">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="text-center p-6">
                                                <h2 className="text-white text-xl font-bold mb-2">{project.title}</h2>
                                                <p className="text-gray-200">{project.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

