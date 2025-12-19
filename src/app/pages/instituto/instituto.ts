import { Component } from '@angular/core';

import { HeadquartersAndSurroundings } from '@/app/components/pages/instituto/headquarters-and-surroundings/headquarters-and-surroundings';
import { MissionVision } from '@/app/components/pages/instituto/mission-vision/mission-vision';
import { TrajectoryAndOrigin } from '@/app/components/pages/instituto/trajectory-and-origin/trajectory-and-origin';
import { StrategicCareers } from '@/app/components/pages/instituto/strategic-careers/strategic-careers';

@Component({
  selector: 'instituto',
  imports: [MissionVision, TrajectoryAndOrigin, HeadquartersAndSurroundings, StrategicCareers],
  templateUrl: './instituto.html',
  styleUrl: './instituto.css',
})
export class InstitutoComponent {

}
