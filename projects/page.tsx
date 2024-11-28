import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const projects = {
    "dwarf-studio": {
        title: "Stage Dwarf Animation Studio",
        content: `Lors de ce stage très enrichissant d'un point de vue personnel comme professionnel chez Dwarf Animation Studio,
    j'ai eu l'occasion de travailler sur le pipeline de production du studio afin d'y implémenter une nouvelle fonctionnalité, 
    la résolution des problèmes et l'amélioration de la qualité du code pour une meilleure maintenance à long terme.`,
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ]
    },
    "internship-management": {
        title: "Site de gestion des stages",
        content: `Ce projet consiste en la réalisation d'un site web qui doit correspondre aux besoins spécifiques d'un client.
    Nous avons utilisé PHP, HTML, CSS, JavaScript et SQL pour développer cette application.`,
        images: ["/placeholder.svg?height=400&width=600"]
    },
    "aventuriers-rail": {
        title: "Les Aventuriers du rail",
        content: `Ce projet, réalisé en première année de BUT consistait à développer un jeu de société appelé "Les aventuriers du Rail" en Java/JavaFX.`,
        images: ["/placeholder.svg?height=400&width=600"]
    },
    "mastermind": {
        title: "Mastermind",
        content: `Ce projet a été réalisé en première année de BUT en binôme, nous avons du développer un jeu de Mastermind en Java.`,
        images: ["/placeholder.svg?height=400&width=600"]
    }
}

export default function ProjectPage({ params }: { params: { id: string } }) {
    const project = projects[params.id as keyof typeof projects]

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[rgba(229,226,232,0.65)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/projects">
                    <Button variant="ghost" className="mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux projets
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-8">{project.title}</h1>

                <div className="prose prose-lg max-w-none mb-12">
                    <p>{project.content}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="rounded-lg shadow-md hover:shadow-xl transition-shadow"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

