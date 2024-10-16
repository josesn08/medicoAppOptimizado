import { ChangeDetectionStrategy, Component, viewChild, CUSTOM_ELEMENTS_SCHEMA, signal, computed, inject, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { MatRadioModule} from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable, startWith, map, BehaviorSubject } from 'rxjs';
import { EscalaGlasgowComponent } from 'src/app/estructuraTeorica/formularios/escala-glasgow/escala-glasgow.component';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';



@Component({
  selector: 'app-disnea-aguda',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatAutocompleteModule,
    AsyncPipe,
    EscalaGlasgowComponent,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disnea-aguda.component.html',
  styleUrl: './disnea-aguda.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DisneaAgudaComponent {
  disneaAgudaForm : FormGroup;
  condicionPacienteForm: FormGroup;
  accordion = viewChild.required(MatAccordion);
  opcionesSuplementoOxigeno: string[] = ['Gafas nasales', 'Sistema ventury (Ventimask)', 'Mascara con Reservorio', 'Gafas nasales de alto flujo', 'Ventilación mecánica no invasiva (VMNI)'];
  opcionesFiltradas!: Observable<string[]>;
  readonly condicionesPaciente = signal<string[]>([]);
  separatorKeysCodes: number[] = [ENTER, COMMA];
  announcer = inject(LiveAnnouncer);
  opcionesCondicionPaciente = [
    { label: 'Alteración del estado mental', controlName: 'alteracionEstadoMental' },
    { label: 'Cianosis', controlName: 'cianosis' },
    { label: 'Uso de musculatura accesoria', controlName: 'usoMusculaturaAccesoria' },
    { label: 'Mala perfusión tisular', controlName: 'malaPerfusionTisular' },
    { label: 'Claudicación del esfuerzo respiratorio', controlName: 'claudicacionEsfuerzoRespiratorio' },
    { label: 'Imposibilidad de hablar', controlName: 'imposibilidadHablar' },
    { label: 'Hipotensión', controlName: 'hipotension' },
    { label: 'Taquicardia', controlName: 'taquicardia' },
    { label: 'Saturación menor de 90%', controlName: 'saturacionMenor90' },
  ];

  // Inicializar las opciones de condiciones del paciente como BehaviorSubject
  readonly condicionesPacienteSubject = new BehaviorSubject<string[]>([]);
  condicionesPaciente$ = this.condicionesPacienteSubject.asObservable();

  condicionPacienteActualFiltrada$!: Observable<string[]>;



  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef

  ){
    this.disneaAgudaForm = this.fb.group({
      suplementoOxigeno:[''],
      paradaCardiorrespiratoria:[''],
      necesidadOxigeno:[],
      mejoriaSaturacion:[],

    });

    this.condicionPacienteForm = this.fb.group({
      alteracionEstadoMental: [false],
      cianosis: [false],
      usoMusculaturaAccesoria: [false],
      malaPerfusionTisular: [false],
      claudicacionEsfuerzoRespiratorio: [false],
      imposibilidadHablar: [false],
      hipotension: [false],
      taquicardia: [false],
      saturacionMenor90: [false],
      condicionPacienteActual:['']
    });


  }

  condicionPacienteActualFiltrada: string[] = [];

  ngOnInit(): void {
    this.opcionesFiltradas = this.disneaAgudaForm.get('suplementoOxigeno')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filtro(value || '')),
    );

    this.condicionPacienteActualFiltrada$ = this.condicionPacienteForm.get('condicionPacienteActual')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filtroCondicionesPaciente(value || ''))
    );

  }

  iniciarRCP(event:any){
    const selectedValue = event.value === 'true';
    if (selectedValue){
      this.abrirAlerta();
    }
  }

  abrirAlerta(): void {
    const referenciaDialogo = this.dialog.open(AlertDialogComponent);

    referenciaDialogo.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private _filtro(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.opcionesSuplementoOxigeno.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filtroCondicionesPaciente(value: string): string[] {
    const filterValue = value.toLowerCase();
    const condicionesPaciente = this.condicionesPacienteSubject.value;
    return this.opcionesCondicionPaciente
      .map(opcion => opcion.label)
      .filter(condicionPaciente => condicionPaciente.toLowerCase().includes(filterValue) && !condicionesPaciente.includes(condicionPaciente));
  }



  agregarCondicionPaciente(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.condicionesPacienteSubject.value.includes(value)) {
      this.condicionesPacienteSubject.next([...this.condicionesPacienteSubject.value, value]);
    }
    this.condicionPacienteForm.get('condicionPacienteActual')?.setValue('');
  }

  eliminarCondicionPaciente(condicionPaciente: string): void {
    this.condicionesPaciente.update(condicionesPaciente => {
      const index = condicionesPaciente.indexOf(condicionPaciente);
      if (index < 0) {
        return condicionesPaciente;
      }

      condicionesPaciente = this.condicionesPacienteSubject.value.filter(c => c !== condicionPaciente);
      this.condicionesPacienteSubject.next(condicionesPaciente);

      condicionesPaciente.splice(index, 1);
      this.announcer.announce(`Removed ${condicionPaciente}`);
      return [...condicionesPaciente];
    });
  }

  seleccionarCondicionPaciente(event: MatAutocompleteSelectedEvent): void {
    this.condicionesPaciente.update(condicionesPaciente => [...condicionesPaciente, event.option.viewValue]);
    const value = event.option.viewValue;
    if (!this.condicionesPacienteSubject.value.includes(value)) {
      this.condicionesPacienteSubject.next([...this.condicionesPacienteSubject.value, value]);
    }

    this.condicionPacienteForm.get('condicionPacienteActual')?.reset();

  }

}


@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./disnea-aguda.component.css'],
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent {}
