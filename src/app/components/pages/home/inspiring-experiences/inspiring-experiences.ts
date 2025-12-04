import { OpinionsCard, Testimonio } from '@/app/components/globals/opinions-card/opinions-card';
import { Component } from '@angular/core';

const TESTIMONIOS_MOCK: Testimonio[] = [
  {
    id: 1,
    nombre: "Ricardo Méndez",
    carrera: "Sistemas Embebidos e IoT",
    texto: "Lo mejor fue aprender a integrar sensores con plataformas en la nube. Ese enfoque práctico me permitió sumarme a un proyecto real de monitoreo industrial.",
    rating: 5
  },
  {
    id: 2,
    nombre: "Carla Torres",
    carrera: "Eficiencia Energética",
    texto: "La tecnicatura tiene una orientación muy aplicada. Hoy realizo diagnósticos energéticos en pymes y siento que aprovecho cada herramienta que aprendimos.",
    rating: 5
  },
  {
    id: 3,
    nombre: "Diego Sarmiento",
    carrera: "Sistemas Embebidos e IoT",
    texto: "Entré sin experiencia en microcontroladores y terminé desarrollando un prototipo completo con conectividad LoRa. Los profesores acompañan muchísimo.",
    rating: 4
  },
  {
    id: 4,
    nombre: "María Luján Ferreyra",
    carrera: "Eficiencia Energética",
    texto: "El instituto me ayudó a entender cómo funciona el consumo real en edificios. Gracias a eso pude conseguir una pasantía en una empresa de auditorías.",
    rating: 5
  },
  {
    id: 5,
    nombre: "Tomás Benítez",
    carrera: "Sistemas Embebidos e IoT",
    texto: "La parte de hardware fue clave para mí. Diseñamos circuitos, programamos drivers y probamos todo en laboratorios excelentes.",
    rating: 5
  },
  {
    id: 6,
    nombre: "Florencia Ramallo",
    carrera: "Analista de Sistemas",
    texto: "La formación me dio bases sólidas en programación y análisis. Hoy trabajo como desarrolladora junior y me siento muy preparada.",
    rating: 5
  },
  {
    id: 7,
    nombre: "Emilio Cardozo",
    carrera: "Eficiencia Energética",
    texto: "Me gustó el enfoque sustentable. Aprendimos a evaluar consumos reales, proponer mejoras y justificar económicamente los proyectos.",
    rating: 4
  },
  {
    id: 8,
    nombre: "Julieta Quiroga",
    carrera: "Sistemas Embebidos e IoT",
    texto: "Los proyectos finales fueron una experiencia increíble. Trabajamos con protocolos industriales y pudimos mostrar prototipos funcionales a empresas.",
    rating: 5
  },
  {
    id: 9,
    nombre: "Nicolás Sena",
    carrera: "Eficiencia Energética",
    texto: "La cursada es exigente, pero muy formativa. Hicimos prácticas con instrumental profesional y eso me abrió puertas en el sector eléctrico.",
    rating: 5
  },
  {
    id: 10,
    nombre: "Ailén Robles",
    carrera: "Sistemas Embebidos e IoT",
    texto: "Siempre quise dedicarme a la electrónica y acá encontré un espacio súper profesional. Programar dispositivos conectados fue lo que más me atrapó.",
    rating: 5
  },
  {
    id: 11,
    nombre: "Patricio Duarte",
    carrera: "Eficiencia Energética",
    texto: "Estudiar acá me dio una visión completa sobre energías renovables y normativas. Hoy colaboro en proyectos de eficiencia en instituciones públicas.",
    rating: 4
  },
  {
    id: 12,
    nombre: "Melina Vargas",
    carrera: "Sistemas Embebidos e IoT",
    texto: "Hay un acompañamiento constante. Desde los primeros meses armamos dispositivos con comunicación inalámbrica y control desde apps web.",
    rating: 5
  }
];


@Component({
  selector: 'app-inspiring-experiences',
  imports: [OpinionsCard],
  templateUrl: './inspiring-experiences.html',
  styleUrl: './inspiring-experiences.css'
})
export class InspiringExperiences {
  testimonios: Testimonio[] = TESTIMONIOS_MOCK;
  visibleTestimonios: Testimonio[] = [];
  
  currentIndex: number = 0;
  itemsToShow: number = 3;

  ngOnInit(): void {
    this.updateVisibleTestimonios();
  }

  updateVisibleTestimonios() {
    this.visibleTestimonios = this.testimonios.slice(this.currentIndex, this.currentIndex + this.itemsToShow);
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleTestimonios();
    }
  }

  next() {
    if (this.currentIndex + this.itemsToShow < this.testimonios.length) {
      this.currentIndex++;
      this.updateVisibleTestimonios();
    }
  }

  // Helpers para controlar el estado visual de las flechas
  get isPrevDisabled(): boolean {
    return this.currentIndex === 0;
  }

  get isNextDisabled(): boolean {
    return this.currentIndex + this.itemsToShow >= this.testimonios.length;
  }
}
