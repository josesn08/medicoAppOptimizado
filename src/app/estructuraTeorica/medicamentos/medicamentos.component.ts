import { FormGroup, FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {AsyncPipe} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,CommonModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, AsyncPipe, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css'

})
export class MedicamentosComponent implements OnInit{
  medicamentosForm:FormGroup;
  presentaciones:string[]=[]
  filteredMedicamentos: Observable<Array<{nombreGenerico: string; presentacion: string;}>> | undefined;
  medicamentos: Array<{
    nombreComercial: string;
    nombreGenerico: string;
    presentacion: string;}> = [
    { nombreComercial: 'ORENCIA', nombreGenerico: 'Abatacept', presentacion: '250MG 1 VIAL POLVO PARA CONCENTRADO PARA SOL PARA PERFUS' },
    { nombreComercial: 'ORENCIA', nombreGenerico: 'Abatacept', presentacion: '125MG 4 JERINGAS PRECARGADAS DE 1ML SOLUCION INYECTABLE' },
    { nombreComercial: 'ORENCIA', nombreGenerico: 'Abatacept', presentacion: '125MG 4 PLUMAS PRECARGADAS 1ML SOLUCION INYECTABLE' },

    { nombreComercial: 'VERZENIOS', nombreGenerico: 'Abemaciclib', presentacion: '100MG 56 COMPRIMIDOS RECUBIERTOS CON PELICULA' },
    { nombreComercial: 'VERZENIOS', nombreGenerico: 'Abemaciclib', presentacion: '150MG 56 COMPRIMIDOS RECUBIERTOS CON PELICULA' },
    { nombreComercial: 'VERZENIOS', nombreGenerico: 'Abemaciclib', presentacion: '50MG 56 COMPRIMIDOS RECUBIERTOS CON PELICULA' },

    { nombreComercial: 'ABIRATERONA ACCORD', nombreGenerico: 'Abiraterona', presentacion: '500MG 60 COMPRIMIDOS RECUBIERTOS' },

    { nombreComercial: 'CIBINQO', nombreGenerico: 'Abrocitinib', presentacion: '100MG 28 COMPRIMIDOS RECUBIERTOS CON PELICULA' },
    { nombreComercial: 'CIBINQO', nombreGenerico: 'Abrocitinib', presentacion: '200MG 28 COMPRIMIDOS RECUBIERTOS CON PELICULA' },
    { nombreComercial: 'CIBINQO', nombreGenerico: 'Abrocitinib', presentacion: '50MG 28 COMPRIMIDOS RECUBIERTOS CON PELICULA' },

    { nombreComercial: 'CALQUENCE', nombreGenerico: 'Acalabrutinib', presentacion: '100MG 60 CAPSULAS DURAS' },

    { nombreComercial: 'CAMPRAL', nombreGenerico: 'Acamprosato', presentacion: '333MG 84 COMPRIMIDOS RECUBIERTOS' },

    { nombreComercial: 'ACARBOSA TECNIGEN', nombreGenerico: 'Acarbosa', presentacion: '100MG 100 COMPRIMIDOS' },

    { nombreComercial: 'ACECLOFENACO CINFA', nombreGenerico: 'Aceclofenaco', presentacion: '100MG 20 COMPRIMIDOS RECUBIERTOS' },

    { nombreComercial: 'AIRTAL DIFUCREM', nombreGenerico: 'Airtal', presentacion: '1,5% 60G CREMA' },

    { nombreComercial: 'SINTROM', nombreGenerico: 'Acenocumarol', presentacion: '1MG 60 COMPRIMIDOS' },
    { nombreComercial: 'SINTROM', nombreGenerico: 'Acenocumarol', presentacion: '4MG 20 COMPRIMIDOS' },
    { nombreComercial: 'SINTROM', nombreGenerico: 'Acenocumarol', presentacion: '4MG 500 COMPRIMIDOS' },

    { nombreComercial: 'EDEMOX', nombreGenerico: 'Acetazolamida', presentacion: '250MG 20 COMPRIMIDOS' },

    { nombreComercial: 'HIDONAC ANTIDOTO', nombreGenerico: 'Ácido hialurónico', presentacion: '200MG/ML 1 VIAL 25ML CONCENTRADO SOLUC PARA PERFUSION' },

    { nombreComercial: 'FLUMIL', nombreGenerico: 'Acetilcisteína', presentacion: '10% 300MG/AMPOLLA 5 AMPOLLAS 3ML' },

    { nombreComercial: 'ACETILCOLINA', nombreGenerico: 'Acetilcolina', presentacion: '10MG/ML CUSI 1 VIAL POLVO Y DISOLVENTE SOL PARA INSTILACION VIA INTRAOCULAR' },

    { nombreComercial: 'ACICLOVIR ACCORD', nombreGenerico: 'Aciclovir', presentacion: '50 VIALES INYECTABLE EFG' },

    { nombreComercial: 'ZOVIDUO', nombreGenerico: 'Aciclovir + Hidrocortisona', presentacion: '50 MG/G + 10 MG/G CREMA, 1 TUBO DE 2 G' },

    { nombreComercial: 'ACICLOVIR ARISTO', nombreGenerico: 'Aciclovir', presentacion: '50 MG/G CREMA EFG, 1 TUBO DE 5 G' },

    { nombreComercial: 'AMELUZ', nombreGenerico: 'Ácido aminolevulínico', presentacion: '78MG/G 1 TUBO 2G GEL' },
    { nombreComercial: 'GLIOLAN', nombreGenerico: 'Ácido 5-aminolevulínico', presentacion: '30MG/ML 1 VIAL 1,5G POLVO PARA SOLUCION ORAL' },

    { nombreComercial: 'INYESPRIN', nombreGenerico: 'Ácido acetilsalicílico', presentacion: '900MG 100 VIALES' },
    { nombreComercial: 'INYESPRIN', nombreGenerico: 'Ácido acetilsalicílico', presentacion: '900MG 20 VIALES' },

    { nombreComercial: 'A.A.S.', nombreGenerico: 'Ácido acetilsalicílico', presentacion: '100MG 30 COMPRIMIDOS' },
    { nombreComercial: 'ÁCIDO ACETILSALICÍLICO', nombreGenerico: 'Ácido acetilsalicílico', presentacion: '100MG 30 COMPRIMIDOS' },

    { nombreComercial: 'DOLMEN', nombreGenerico: 'Ácido acetilsalicílico + Clorfenamina', presentacion: '20 COMPRIMIDOS EFERVESCENTES' },
    { nombreComercial: 'DOLVIRAN', nombreGenerico: 'Ácido acetilsalicílico + Clorfenamina', presentacion: '20 COMPRIMIDOS' },
    { nombreComercial: 'DOLVIRAN', nombreGenerico: 'Ácido acetilsalicílico + Clorfenamina', presentacion: '10 SUPOSITORIOS ADULTOS' },

    { nombreComercial: 'ACTRON COMPUESTO (IP)', nombreGenerico: 'Ácido acetilsalicílico + Paracetamol + Cafeína', presentacion: '267 MG/133 MG/40 MG' },

    { nombreComercial: 'URONEFREX', nombreGenerico: 'Alfuzosina', presentacion: '125MG 50 CAPSULAS' },
    { nombreComercial: 'URONEFREX', nombreGenerico: 'Alfuzosina', presentacion: '250MG 50 CAPSULAS' },

    { nombreComercial: 'FOSAVANCE', nombreGenerico: 'Alendronato + Colecalciferol', presentacion: '70MG/2800UI 4 COMPRIMIDOS' },
    { nombreComercial: 'ADROVANCE', nombreGenerico: 'Alendronato + Colecalciferol', presentacion: '70MG/2800UI 4 COMPRIMIDOS' },

    { nombreComercial: 'ÁCIDO ASCÓRBICO BAYER', nombreGenerico: 'Ácido ascórbico', presentacion: '1000MG/5ML 6 AMPOLLAS 5ML SOLUCION INYECTABLE' },

    { nombreComercial: 'FINACEA', nombreGenerico: 'Ácido azelaico', presentacion: '150 MG/G GEL, 1 TUBO DE 30 G' },
    { nombreComercial: 'ZELIDERM', nombreGenerico: 'Ácido azelaico', presentacion: '200 MG/G CREMA, 1 TUBO DE 30 G' },

    { nombreComercial: 'NILEMDO', nombreGenerico: 'Nilemdo', presentacion: '180 MG COMPRIMIDOS RECUBIERTOS CON PELICULA, 28 COMPRIMIDOS' },

    { nombreComercial: 'NUSTENDI', nombreGenerico: 'Nustendi', presentacion: '180 MG/10 MG COMPRIMIDOS RECUBIERTOS CON PELICULA, 28 COMPRIMIDOS' },

    { nombreComercial: 'ÁCIDO CARGLÚMICO WAYMADE', nombreGenerico: 'Ácido carglumico', presentacion: '200MG 5 COMPRIMIDOS' },

    { nombreComercial: 'ORPHACOL', nombreGenerico: 'Ácido cólico', presentacion: '250 MG 60 COMPRIMIDOS RECUBIERTOS' },

    { nombreComercial: 'AZOPT', nombreGenerico: 'Brinzolamida', presentacion: '10 MG/ML 1 FRASCO 5 ML SOLUCIÓN OFTÁLMICA' },

    { nombreComercial: 'BIRTEK', nombreGenerico: 'Budesonida', presentacion: '0,2MG/ML 4 FRASCOS 30 ML SOLUCIÓN INHALATORIA' },

    { nombreComercial: 'BUDENOFAL', nombreGenerico: 'Budesonida', presentacion: '100MCG 60 DOSIS INHALADOR' },

    { nombreComercial: 'BUDESONIDA 24', nombreGenerico: 'Budesonida', presentacion: '0,5MG/ML 1 FRASCO 30 ML SOLUCIÓN INHALATORIA' },

    { nombreComercial: 'CIMZIA', nombreGenerico: 'Certolizumab pegol', presentacion: '200MG 1 JERINGA PRECARGADA' },

    { nombreComercial: 'GILENYA', nombreGenerico: 'Fingolimod', presentacion: '0,5MG 28 COMPRIMIDOS RECUBIERTOS CON PELICULA' },

    { nombreComercial: 'MYRBETRIQ', nombreGenerico: 'Mirabegron', presentacion: '25MG 30 COMPRIMIDOS RECUBIERTOS CON PELICULA' },
    { nombreComercial: 'MYRBETRIQ', nombreGenerico: 'Mirabegron', presentacion: '50MG 30 COMPRIMIDOS RECUBIERTOS CON PELICULA' },

    { nombreComercial: 'LARTRUVO', nombreGenerico: 'Olaratumab', presentacion: '20MG/ML 1 FRASCO 100 ML SOLUCION INYECTABLE' },
    { nombreComercial: 'LARTRUVO', nombreGenerico: 'Olaratumab', presentacion: '20MG/ML 1 FRASCO 400 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'OLIMPIA', nombreGenerico: 'Omeprazol', presentacion: '20MG 28 COMPRIMIDOS' },
    { nombreComercial: 'OLIMPIA', nombreGenerico: 'Omeprazol', presentacion: '40MG 28 COMPRIMIDOS' },

    { nombreComercial: 'OMEPRAZOL CINFA', nombreGenerico: 'Omeprazol', presentacion: '10MG 28 COMPRIMIDOS' },
    { nombreComercial: 'OMEPRAZOL CINFA', nombreGenerico: 'Omeprazol', presentacion: '20MG 28 COMPRIMIDOS' },

    { nombreComercial: 'ABASAGLAR', nombreGenerico: 'Insulina glargina', presentacion: '100UI/ML 1 FRASCO 10 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'TYGACIL', nombreGenerico: 'Tigeciclina', presentacion: '50MG 1 FRASCO POLVO PARA SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'THYROXIN', nombreGenerico: 'Levotiroxina sódica', presentacion: '50MCG 100 COMPRIMIDOS' },
    { nombreComercial: 'THYROXIN', nombreGenerico: 'Levotiroxina sódica', presentacion: '100MCG 100 COMPRIMIDOS' },

    { nombreComercial: 'PROLIA', nombreGenerico: 'Denosumab', presentacion: '60MG 1 JERINGA PRECARGADA' },

    { nombreComercial: 'ENBREL', nombreGenerico: 'Etanercept', presentacion: '25MG 4 JERINGAS PRECARGADAS' },

    { nombreComercial: 'LANTUS', nombreGenerico: 'Insulina glargina', presentacion: '100UI/ML 10 ML FRASCO' },

    { nombreComercial: 'ANAFRANIL', nombreGenerico: 'Clomipramina', presentacion: '25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LUTRATE', nombreGenerico: 'Leuprolida', presentacion: '11,25MG 1 VIAL POLVO' },

    { nombreComercial: 'SECTRAL', nombreGenerico: 'Acebutolol', presentacion: '200MG 30 COMPRIMIDOS' },
    { nombreComercial: 'SECTRAL', nombreGenerico: 'Acebutolol', presentacion: '400MG 30 COMPRIMIDOS' },

    { nombreComercial: 'DICLOFENAC TECNIGEN', nombreGenerico: 'Diclofenaco', presentacion: '25MG 20 COMPRIMIDOS' },
    { nombreComercial: 'DICLOFENAC TECNIGEN', nombreGenerico: 'Diclofenaco', presentacion: '50MG 30 COMPRIMIDOS' },

    { nombreComercial: 'PRADAXA', nombreGenerico: 'Dabigatrán', presentacion: '110MG 30 COMPRIMIDOS' },
    { nombreComercial: 'PRADAXA', nombreGenerico: 'Dabigatrán', presentacion: '150MG 30 COMPRIMIDOS' },

    { nombreComercial: 'TARGRETIN', nombreGenerico: 'Bexaroteno', presentacion: '75MG 120 COMPRIMIDOS' },

    { nombreComercial: 'INVOKANA', nombreGenerico: 'Canagliflozina', presentacion: '100MG 30 COMPRIMIDOS' },
    { nombreComercial: 'INVOKANA', nombreGenerico: 'Canagliflozina', presentacion: '300MG 30 COMPRIMIDOS' },

    { nombreComercial: 'FORXIGA', nombreGenerico: 'Dapagliflozina', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'DUPIXENT', nombreGenerico: 'Dupilumab', presentacion: '300MG/2ML 2 JERINGAS PRECARGADAS' },

    { nombreComercial: 'DURAGESIC', nombreGenerico: 'Fentanilo', presentacion: '12MCG/H 1 PARCHE' },
    { nombreComercial: 'DURAGESIC', nombreGenerico: 'Fentanilo', presentacion: '24MCG/H 1 PARCHE' },

    { nombreComercial: 'XELJANZ', nombreGenerico: 'Tofacitinib', presentacion: '5MG 60 COMPRIMIDOS' },

    { nombreComercial: 'MAJASPECT', nombreGenerico: 'Acelofenaco', presentacion: '500MG 30 COMPRIMIDOS' },

    { nombreComercial: 'EXEMESTANO', nombreGenerico: 'Exemestano', presentacion: '25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'REMICADE', nombreGenerico: 'Infliximab', presentacion: '100MG 1 VIAL' },

    { nombreComercial: 'FAVIR', nombreGenerico: 'Foscarnet', presentacion: '24MG/ML 1 FRASCO 50ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'OVARIA', nombreGenerico: 'Ovarian', presentacion: '1000MG 1 VIAL POLVO PARA SOLUCION INYECTABLE' },

    { nombreComercial: 'VENCLEXTA', nombreGenerico: 'Venetoclax', presentacion: '10 MG 30 COMPRIMIDOS RECUBIERTOS CON PELICULA' },
    { nombreComercial: 'VENCLEXTA', nombreGenerico: 'Venetoclax', presentacion: '50 MG 30 COMPRIMIDOS RECUBIERTOS CON PELICULA' },

    { nombreComercial: 'FOSAMAX', nombreGenerico: 'Alendronato', presentacion: '70MG 4 COMPRIMIDOS' },
    { nombreComercial: 'FOSAMAX', nombreGenerico: 'Alendronato', presentacion: '70MG 8 COMPRIMIDOS' },

    { nombreComercial: 'FOSAMAX PLUS D', nombreGenerico: 'Alendronato + Colecalciferol', presentacion: '70MG/2800UI 4 COMPRIMIDOS' },

    { nombreComercial: 'DEPAKINE', nombreGenerico: 'Valproato de sodio', presentacion: '300MG 100 COMPRIMIDOS RETARD' },
    { nombreComercial: 'DEPAKINE', nombreGenerico: 'Valproato de sodio', presentacion: '500MG 100 COMPRIMIDOS RETARD' },

    { nombreComercial: 'ACLASTA', nombreGenerico: 'Zoledronato', presentacion: '5 MG 1 VIAL POLVO PARA SOLUCION INYECTABLE' },

    { nombreComercial: 'FLIXOTIDE', nombreGenerico: 'Fluticasona', presentacion: '50MCG 60 DOSIS INHALADOR' },
    { nombreComercial: 'FLIXOTIDE', nombreGenerico: 'Fluticasona', presentacion: '250MCG 60 DOSIS INHALADOR' },

    { nombreComercial: 'ACTEMRA', nombreGenerico: 'Tocilizumab', presentacion: '20MG/ML 1 FRASCO 100 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'FOLGARD', nombreGenerico: 'Ácido fólico + Vitaminas B12 y B6', presentacion: '1MG + 1MG + 25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'AFINITOR', nombreGenerico: 'Everolimus', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'POTABA', nombreGenerico: 'Potaba', presentacion: '1,5G 100 COMPRIMIDOS' },

    { nombreComercial: 'RIBAVIRINA MYLAN', nombreGenerico: 'Ribavirina', presentacion: '200MG 28 COMPRIMIDOS RECUBIERTOS' },
    { nombreComercial: 'RIBAVIRINA MYLAN', nombreGenerico: 'Ribavirina', presentacion: '400MG 28 COMPRIMIDOS RECUBIERTOS' },
    { nombreComercial: 'RIBAVIRINA MYLAN', nombreGenerico: 'Ribavirina', presentacion: '600MG 28 COMPRIMIDOS RECUBIERTOS' },

    { nombreComercial: 'RETIN-A', nombreGenerico: 'Tretinoína', presentacion: '0,05% 30 G CREMA' },

    { nombreComercial: 'GENOTROPIN', nombreGenerico: 'Somatropina', presentacion: '12MG 1 VIAL POLVO Y DISOLVENTE PARA SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'SALAZOPYRIN', nombreGenerico: 'Sulfasalazina', presentacion: '500MG 50 COMPRIMIDOS' },

    { nombreComercial: 'VIRAMED', nombreGenerico: 'Viramidina', presentacion: '20MG 30 COMPRIMIDOS' },
    { nombreComercial: 'VIRAMED', nombreGenerico: 'Viramidina', presentacion: '40MG 30 COMPRIMIDOS' },

    { nombreComercial: 'VAGIFEM', nombreGenerico: 'Estradiol', presentacion: '10MCG 14 OVULOS' },

    { nombreComercial: 'REPREXAIN', nombreGenerico: 'Naproxeno + Esomeprazol', presentacion: '500MG + 20MG 10 COMPRIMIDOS' },

    { nombreComercial: 'ACANTIL', nombreGenerico: 'Acanthopanax', presentacion: '50MG 30 COMPRIMIDOS' },

    { nombreComercial: 'ABRIL', nombreGenerico: 'Amitriptilina', presentacion: '25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'BLOCOX', nombreGenerico: 'Coxib', presentacion: '200MG 30 COMPRIMIDOS' },

    { nombreComercial: 'NUVIGIL', nombreGenerico: 'Modafinilo', presentacion: '200MG 30 COMPRIMIDOS' },

    { nombreComercial: 'HALOBACTER', nombreGenerico: 'Baclofen', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'MYLAN-PROFENID', nombreGenerico: 'Ketoprofeno', presentacion: '100MG 20 COMPRIMIDOS' },

    { nombreComercial: 'ELAPRIL', nombreGenerico: 'Enalapril', presentacion: '20MG 30 COMPRIMIDOS' },

    { nombreComercial: 'AMPRIL', nombreGenerico: 'Amiodarona', presentacion: '200MG 30 COMPRIMIDOS' },

    { nombreComercial: 'DEPAKOTE', nombreGenerico: 'Valproato de sodio', presentacion: '500MG 30 COMPRIMIDOS' },

    { nombreComercial: 'XENICAL', nombreGenerico: 'Orlistat', presentacion: '120MG 84 COMPRIMIDOS' },

    { nombreComercial: 'TOPAMAX', nombreGenerico: 'Topiramato', presentacion: '50MG 60 COMPRIMIDOS' },

    { nombreComercial: 'INSPRA', nombreGenerico: 'Eplerenona', presentacion: '25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'EFEXOR', nombreGenerico: 'Venlafaxina', presentacion: '75MG 30 COMPRIMIDOS' },

    { nombreComercial: 'REMERON', nombreGenerico: 'Mirtazapina', presentacion: '30MG 30 COMPRIMIDOS' },

    { nombreComercial: 'INTRON A', nombreGenerico: 'Interferón alfa-2b', presentacion: '3 MILLONES DE UNIDADES 1 FRASCO 1,5 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'LONITEN', nombreGenerico: 'Minoxidil', presentacion: '10MG 100 COMPRIMIDOS' },

    { nombreComercial: 'SOMATOTROPIN', nombreGenerico: 'Somatotropina', presentacion: '4MG 1 VIAL POLVO PARA SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'XOLAIR', nombreGenerico: 'Omalizumab', presentacion: '150MG 1 JERINGA PRECARGADA' },

    { nombreComercial: 'HUMIRA', nombreGenerico: 'Adalimumab', presentacion: '40MG/0,4ML 2 JERINGAS PRECARGADAS' },

    { nombreComercial: 'CIMZIA', nombreGenerico: 'Certolizumab pegol', presentacion: '200MG 1 JERINGA PRECARGADA' },

    { nombreComercial: 'KISQALI', nombreGenerico: 'Ribociclib', presentacion: '200MG 21 COMPRIMIDOS' },

    { nombreComercial: 'KISQALI', nombreGenerico: 'Ribociclib', presentacion: '400MG 21 COMPRIMIDOS' },

    { nombreComercial: 'TARGRETIN', nombreGenerico: 'Bexaroteno', presentacion: '75MG 120 COMPRIMIDOS' },

    { nombreComercial: 'XANAX', nombreGenerico: 'Alprazolam', presentacion: '0,25MG 30 COMPRIMIDOS' },
    { nombreComercial: 'XANAX', nombreGenerico: 'Alprazolam', presentacion: '1MG 30 COMPRIMIDOS' },

    { nombreComercial: 'BELSOMRA', nombreGenerico: 'Suvorexant', presentacion: '20MG 30 COMPRIMIDOS' },

    { nombreComercial: 'SYMBICORT', nombreGenerico: 'Budesonida + Formoterol', presentacion: '160MCG/4,5MCG 60 DOSIS INHALADOR' },

    { nombreComercial: 'DILANTIN', nombreGenerico: 'Fenitoína', presentacion: '100MG 100 COMPRIMIDOS' },

    { nombreComercial: 'ASOLAN', nombreGenerico: 'Furoato de mometasona', presentacion: '0,1% 1 FRASCO 30 ML SOLUCIÓN NASAL' },

    { nombreComercial: 'TAMBACOR', nombreGenerico: 'Flecainida', presentacion: '100MG 30 COMPRIMIDOS' },

    { nombreComercial: 'TAMBACOR', nombreGenerico: 'Flecainida', presentacion: '150MG 30 COMPRIMIDOS' },

    { nombreComercial: 'HUMIRA', nombreGenerico: 'Adalimumab', presentacion: '40MG/0,4ML 2 JERINGAS PRECARGADAS' },

    { nombreComercial: 'XELJANZ', nombreGenerico: 'Tofacitinib', presentacion: '5MG 60 COMPRIMIDOS' },

    { nombreComercial: 'CAPRELSA', nombreGenerico: 'Vandetanib', presentacion: '100MG 30 COMPRIMIDOS' },

    { nombreComercial: 'ONIVYDE', nombreGenerico: 'Irinotecán liposomal', presentacion: '1MG/ML 1 FRASCO 1ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'LEUPROLEX', nombreGenerico: 'Leuprolida', presentacion: '3,75MG 1 VIAL POLVO PARA SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'EUCRISA', nombreGenerico: 'Crisaborole', presentacion: '2% 60 G UNGUENTO' },

    { nombreComercial: 'CALCIUM-OR', nombreGenerico: 'Carbonato de calcio', presentacion: '500MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CALCIUM-OR', nombreGenerico: 'Carbonato de calcio', presentacion: '1000MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CRESTOR', nombreGenerico: 'Rosuvastatina', presentacion: '5MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CRESTOR', nombreGenerico: 'Rosuvastatina', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CRESTOR', nombreGenerico: 'Rosuvastatina', presentacion: '20MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CRESTOR', nombreGenerico: 'Rosuvastatina', presentacion: '40MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CERVARIX', nombreGenerico: 'Vacuna contra el virus del papiloma humano (VPH)', presentacion: '1 FRASCO 1 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'HEPLISAV-B', nombreGenerico: 'Vacuna contra la hepatitis B', presentacion: '0,5 ML 1 FRASCO SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'AQUILES', nombreGenerico: 'Acido acetilsalicilico', presentacion: '100 MG 30 COMPRIMIDOS' },

    { nombreComercial: 'ZOVIRAX', nombreGenerico: 'Aciclovir', presentacion: '200MG 20 COMPRIMIDOS' },

    { nombreComercial: 'REPREXAIN', nombreGenerico: 'Naproxeno + Esomeprazol', presentacion: '500MG + 20MG 10 COMPRIMIDOS' },

    { nombreComercial: 'ZANTAC', nombreGenerico: 'Ranitidina', presentacion: '150MG 30 COMPRIMIDOS' },

    { nombreComercial: 'MORPHINE', nombreGenerico: 'Morfina', presentacion: '10MG/ML 1 FRASCO 10 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'DOLOFIN', nombreGenerico: 'Diclofenaco', presentacion: '50MG 30 COMPRIMIDOS' },

    { nombreComercial: 'JARDIANCE', nombreGenerico: 'Empagliflozina', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'DIFLUCAN', nombreGenerico: 'Fluconazol', presentacion: '150MG 1 CÁPSULA' },

    { nombreComercial: 'CANCIDAS', nombreGenerico: 'Caspofungina', presentacion: '50MG 1 FRASCO POLVO PARA SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'TRULICITY', nombreGenerico: 'Dulaglutida', presentacion: '0,75MG 1 JERINGA PRECARGADA' },

    { nombreComercial: 'MIMPARA', nombreGenerico: 'Cinacalcet', presentacion: '30MG 28 COMPRIMIDOS' },

    { nombreComercial: 'NEORAL', nombreGenerico: 'Ciclosporina', presentacion: '100MG 30 COMPRIMIDOS' },

    { nombreComercial: 'ELICERA', nombreGenerico: 'Atorvastatina', presentacion: '20MG 30 COMPRIMIDOS' },

    { nombreComercial: 'PRILOSEC', nombreGenerico: 'Omeprazol', presentacion: '20MG 28 COMPRIMIDOS' },

    { nombreComercial: 'VIMPAT', nombreGenerico: 'Lacosamida', presentacion: '50MG 14 COMPRIMIDOS' },

    { nombreComercial: 'VIMPAT', nombreGenerico: 'Lacosamida', presentacion: '100MG 14 COMPRIMIDOS' },

    { nombreComercial: 'VIMPAT', nombreGenerico: 'Lacosamida', presentacion: '150MG 14 COMPRIMIDOS' },

    { nombreComercial: 'KETOCONAZOL', nombreGenerico: 'Ketoconazol', presentacion: '200MG 10 COMPRIMIDOS' },

    { nombreComercial: 'TRADJENTA', nombreGenerico: 'Linagliptina', presentacion: '5MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CETIRIZINA', nombreGenerico: 'Cetirizina', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LORATADINA', nombreGenerico: 'Loratadina', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'IMBRUVICA', nombreGenerico: 'Ibrutinib', presentacion: '140MG 30 COMPRIMIDOS' },

    { nombreComercial: 'QVAR', nombreGenerico: 'Beclometasona', presentacion: '50MCG 60 DOSIS INHALADOR' },

    { nombreComercial: 'VIAGRA', nombreGenerico: 'Sildenafil', presentacion: '50MG 4 COMPRIMIDOS' },

    { nombreComercial: 'VIOXX', nombreGenerico: 'Rofecoxib', presentacion: '12,5MG 10 COMPRIMIDOS' },

    { nombreComercial: 'DEPAKOTE', nombreGenerico: 'Valproato de sodio', presentacion: '500MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CYPRESSION', nombreGenerico: 'Ciprofloxacino', presentacion: '500MG 10 COMPRIMIDOS' },

    { nombreComercial: 'PRIMOLUT', nombreGenerico: 'Noretisterona', presentacion: '5MG 30 COMPRIMIDOS' },

    { nombreComercial: 'CONCERTA', nombreGenerico: 'Metilfenidato', presentacion: '36MG 30 COMPRIMIDOS' },

    { nombreComercial: 'RITALIN', nombreGenerico: 'Metilfenidato', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'STILNOX', nombreGenerico: 'Zolpidem', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LIPITOR', nombreGenerico: 'Atorvastatina', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LIPITOR', nombreGenerico: 'Atorvastatina', presentacion: '20MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LIPITOR', nombreGenerico: 'Atorvastatina', presentacion: '40MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LIPITOR', nombreGenerico: 'Atorvastatina', presentacion: '80MG 30 COMPRIMIDOS' },

    { nombreComercial: 'MELATONINA', nombreGenerico: 'Melatonina', presentacion: '3MG 30 COMPRIMIDOS' },

    { nombreComercial: 'MELATONINA', nombreGenerico: 'Melatonina', presentacion: '5MG 30 COMPRIMIDOS' },

    { nombreComercial: 'NEO-CODION', nombreGenerico: 'Dextrometorfano', presentacion: '20MG/5ML 1 FRASCO 100 ML SOLUCIÓN' },

    { nombreComercial: 'VITAMINA D3', nombreGenerico: 'Colecalciferol', presentacion: '1.000 UI 30 COMPRIMIDOS' },

    { nombreComercial: 'HUMIRA', nombreGenerico: 'Adalimumab', presentacion: '40MG/0,4ML 2 JERINGAS PRECARGADAS' },

    { nombreComercial: 'VALTREX', nombreGenerico: 'Valaciclovir', presentacion: '500MG 28 COMPRIMIDOS' },

    { nombreComercial: 'LOCOID', nombreGenerico: 'Hydrocortisona', presentacion: '1% 1 FRASCO 30 ML CREMA' },

    { nombreComercial: 'XALCOM', nombreGenerico: 'Latanoprost + Timolol', presentacion: '0,005% + 0,5% 1 FRASCO 5 ML SOLUCIÓN OFTÁLMICA' },

    { nombreComercial: 'TRAVATAN', nombreGenerico: 'Travoprost', presentacion: '0,004% 1 FRASCO 2,5 ML SOLUCIÓN OFTÁLMICA' },

    { nombreComercial: 'RELIEF', nombreGenerico: 'Aspirina', presentacion: '500 MG 20 COMPRIMIDOS' },

    { nombreComercial: 'ALLERGEX', nombreGenerico: 'Dexclorfeniramina', presentacion: '2MG 30 COMPRIMIDOS' },

    { nombreComercial: 'ELIQUID', nombreGenerico: 'Ácido acetilsalicílico', presentacion: '100 MG 20 COMPRIMIDOS' },

    { nombreComercial: 'OLMETEC', nombreGenerico: 'Olmesartán', presentacion: '20MG 30 COMPRIMIDOS' },

    { nombreComercial: 'OLMETEC', nombreGenerico: 'Olmesartán', presentacion: '40MG 30 COMPRIMIDOS' },

    { nombreComercial: 'OPTYLIN', nombreGenerico: 'Solución ocular con ácido hialurónico', presentacion: '1 FRASCO 10 ML GOTAS OFTÁLMICAS' },

    { nombreComercial: 'HUMIRA', nombreGenerico: 'Adalimumab', presentacion: '40MG/0,4ML 2 JERINGAS PRECARGADAS' },

    { nombreComercial: 'XELJANZ', nombreGenerico: 'Tofacitinib', presentacion: '5MG 60 COMPRIMIDOS' },

    { nombreComercial: 'TICAGRELOR', nombreGenerico: 'Ticagrelor', presentacion: '90MG 60 COMPRIMIDOS' },

    { nombreComercial: 'ACNEDEX', nombreGenerico: 'Clindamicina', presentacion: '1% 1 FRASCO 30 ML GEL' },

    { nombreComercial: 'CINABABY', nombreGenerico: 'Clindamicina', presentacion: '1% 1 FRASCO 30 ML GEL' },

    { nombreComercial: 'DIPRIVAN', nombreGenerico: 'Propofol', presentacion: '10MG/ML 1 FRASCO 100 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'NEO-MULCID', nombreGenerico: 'Carbón activado', presentacion: '250MG 20 COMPRIMIDOS' },

    { nombreComercial: 'LEVITRA', nombreGenerico: 'Vardenafilo', presentacion: '10MG 4 COMPRIMIDOS' },

    { nombreComercial: 'LOMOTIL', nombreGenerico: 'Loperamida', presentacion: '2MG 20 COMPRIMIDOS' },

    { nombreComercial: 'FERTILEX', nombreGenerico: 'Ácido folico', presentacion: '400MCG 30 COMPRIMIDOS' },

    { nombreComercial: 'ANDROFARM', nombreGenerico: 'Testosterona', presentacion: '100MG/ML 1 FRASCO 10 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'GELCLIN', nombreGenerico: 'Clindamicina', presentacion: '1% 1 FRASCO 30 ML GEL' },

    { nombreComercial: 'ANAFRANIL', nombreGenerico: 'Clomipramina', presentacion: '25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'XARELTO', nombreGenerico: 'Rivaroxabán', presentacion: '20MG 30 COMPRIMIDOS' },

    { nombreComercial: 'EMEND', nombreGenerico: 'Aprepitant', presentacion: '80MG 3 CÁPSULAS' },

    { nombreComercial: 'ADENURIC', nombreGenerico: 'Febuxostat', presentacion: '80MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LOMOTIL', nombreGenerico: 'Loperamida', presentacion: '2MG 20 COMPRIMIDOS' },

    { nombreComercial: 'ELACID', nombreGenerico: 'Ácido acetilsalicílico', presentacion: '500 MG 20 COMPRIMIDOS' },

    { nombreComercial: 'DUO-NEB', nombreGenerico: 'Ipratropio + Salbutamol', presentacion: '20MCG + 100MCG 20 ML SOLUCIÓN NEBULIZADOR' },

    { nombreComercial: 'ADENURIC', nombreGenerico: 'Febuxostat', presentacion: '80MG 30 COMPRIMIDOS' },

    { nombreComercial: 'NATURALALTE', nombreGenerico: 'Aceite de pescado', presentacion: '1000MG 30 CÁPSULAS' },

    { nombreComercial: 'AERIUS', nombreGenerico: 'Desloratadina', presentacion: '5MG 30 COMPRIMIDOS' },

    { nombreComercial: 'DOLAMINE', nombreGenerico: 'Aspirina', presentacion: '500 MG 20 COMPRIMIDOS' },

    { nombreComercial: 'ACICLOVIR', nombreGenerico: 'Aciclovir', presentacion: '200MG 20 COMPRIMIDOS' },

    { nombreComercial: 'ACETAMINOFEN', nombreGenerico: 'Paracetamol', presentacion: '500MG 20 COMPRIMIDOS' },

    { nombreComercial: 'TAMIFLU', nombreGenerico: 'Oseltamivir', presentacion: '75MG 10 CÁPSULAS' },

    { nombreComercial: 'ANTIHISTAMINICO', nombreGenerico: 'Loratadina', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'INSPRA', nombreGenerico: 'Eplerenona', presentacion: '25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'TARGRETIN', nombreGenerico: 'Bexaroteno', presentacion: '75MG 120 COMPRIMIDOS' },

    { nombreComercial: 'TRICOR', nombreGenerico: 'Fenofibrato', presentacion: '160MG 30 COMPRIMIDOS' },

    { nombreComercial: 'BRILINTA', nombreGenerico: 'Ticagrelor', presentacion: '90MG 60 COMPRIMIDOS' },

    { nombreComercial: 'ALDACTONE', nombreGenerico: 'Espironolactona', presentacion: '25MG 30 COMPRIMIDOS' },

    { nombreComercial: 'SYMBICORT', nombreGenerico: 'Budesonida + Formoterol', presentacion: '160MCG/4,5MCG 60 DOSIS INHALADOR' },

    { nombreComercial: 'TANAKAN', nombreGenerico: 'Ginkgo biloba', presentacion: '40MG 30 COMPRIMIDOS' },

    { nombreComercial: 'STILNOX', nombreGenerico: 'Zolpidem', presentacion: '10MG 30 COMPRIMIDOS' },

    { nombreComercial: 'TIGECICLINA', nombreGenerico: 'Tigeciclina', presentacion: '50MG 1 FRASCO POLVO PARA SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'PROVENGE', nombreGenerico: 'Vacuna para cáncer de próstata', presentacion: '1 FRASCO 1 ML SOLUCIÓN INYECTABLE' },

    { nombreComercial: 'TOPAMAX', nombreGenerico: 'Topiramato', presentacion: '50MG 60 COMPRIMIDOS' },

    { nombreComercial: 'DEPAKOTE', nombreGenerico: 'Valproato de sodio', presentacion: '500MG 30 COMPRIMIDOS' },

    { nombreComercial: 'LIVALO', nombreGenerico: 'Pitavastatina', presentacion: '4MG 30 COMPRIMIDOS' },

    { nombreComercial: 'SALAZOPYRIN', nombreGenerico: 'Sulfasalazina', presentacion: '500MG 50 COMPRIMIDOS' },

    { nombreComercial: 'DUO-NEB', nombreGenerico: 'Ipratropio + Salbutamol', presentacion: '20MCG + 100MCG 20 ML SOLUCIÓN NEBULIZADOR' },

    { nombreComercial: 'XOLAIR', nombreGenerico: 'Omalizumab', presentacion: '150MG 1 JERINGA PRECARGADA' },

    { nombreComercial: 'BICALUTAMIDA', nombreGenerico: 'Bicalutamida', presentacion: '50MG 30 COMPRIMIDOS' },

    { nombreComercial: 'SEROQUEL', nombreGenerico: 'Quetiapina', presentacion: '100MG 30 COMPRIMIDOS' },

    { nombreComercial: 'SEROQUEL', nombreGenerico: 'Quetiapina', presentacion: '200MG 30 COMPRIMIDOS' },

    { nombreComercial: 'SEROQUEL', nombreGenerico: 'Quetiapina', presentacion: '300MG 30 COMPRIMIDOS' },

    { nombreComercial: 'SEROQUEL', nombreGenerico: 'Quetiapina', presentacion: '400MG 30 COMPRIMIDOS' },
  ];

  constructor(private fb: FormBuilder) {
    this.medicamentosForm = this.fb.group({
      nombreGenerico: [''],
      presentacion: ['']
    });
  }

  ngOnInit() {
    this.filteredMedicamentos = this.medicamentosForm.get('nombreGenerico')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.medicamentosForm.get('nombreGenerico')?.valueChanges.subscribe(nombreGenerico => {
      const selectedMedicamento = this.medicamentos.find(m => m.nombreGenerico === nombreGenerico);
      this.presentaciones = selectedMedicamento ? [selectedMedicamento.presentacion] : [];
      this.medicamentosForm.get('presentacion')?.setValue(this.presentaciones[0] || '');
    });
  }

  get medicamentoControl() {
    return this.medicamentosForm.get('nombreGenerico') as FormControl;
  }

  get presentacionControl() {
    return this.medicamentosForm.get('presentacion') as FormControl;
  }

  private _filter(value: string): Array<{ nombreGenerico: string; presentacion: string }> {
    const filterValue = value.toLowerCase();
    return this.medicamentos.filter(option =>
      option.nombreGenerico.toLowerCase().includes(filterValue)
    );
  }
}
