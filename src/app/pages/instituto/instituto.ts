import { Component } from '@angular/core';

import { HeadquartersAndSurroundings } from '@/app/components/pages/instituto/headquarters-and-surroundings/headquarters-and-surroundings';
import { MissionVision } from '@/app/components/pages/instituto/mission-vision/mission-vision';
import { TrajectoryAndOrigin } from '@/app/components/pages/instituto/trajectory-and-origin/trajectory-and-origin';
import { StrategicCareers } from '@/app/components/pages/instituto/strategic-careers/strategic-careers';
import { HeroSection } from '@/app/components/pages/instituto/hero-section/hero-section';

@Component({
  selector: 'instituto',
  imports: [HeroSection, MissionVision, TrajectoryAndOrigin, HeadquartersAndSurroundings, StrategicCareers],
  templateUrl: './instituto.html',
  styleUrl: './instituto.css',
})
export class InstitutoComponent {

}
