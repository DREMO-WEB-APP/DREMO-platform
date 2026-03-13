import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface ReniecDniResponse {
  first_name: string;
  first_last_name: string;
  second_last_name: string;
  full_name: string;
  document_number: string;
}

@Injectable()
export class DniValidatorService {
  private readonly baseUrl = 'https://api.decolecta.com/v1/reniec/dni';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthToken(): string {
    const token = this.configService.get<string>('DNI_API_TOKEN');
    if (!token) {
      throw new Error('DNI_API_TOKEN no está configurado en las variables de entorno');
    }
    return token;
  }

  async consultarDni(numeroDni: string): Promise<ReniecDniResponse> {
    const url = `${this.baseUrl}?numero=${numeroDni}`;
    const token = this.getAuthToken();

    const response$ = this.httpService.get<ReniecDniResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await firstValueFrom(response$);
    return data;
  }

  /**
   * Compara los nombres y apellidos proporcionados con los obtenidos desde la API RENIEC.
   * Devuelve true si todos coinciden, false en caso contrario.
   */
  async validarDniConNombres(
    dni: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
  ): Promise<boolean> {
    const datos = await this.consultarDni(dni);

    // Normalizar cadenas: mayúsculas, trim y espacios simples
    const normalize = (value: string) =>
      value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toUpperCase()
        .trim()
        .replace(/\s+/g, ' ');

    const inputFirstName = normalize(nombres);
    const inputFirstLastName = normalize(apellidoPaterno);
    const inputSecondLastName = normalize(apellidoMaterno);

    const apiFirstName = normalize(datos.first_name);
    const apiFirstLastName = normalize(datos.first_last_name);
    const apiSecondLastName = normalize(datos.second_last_name);

    const nombresCoinciden = inputFirstName === apiFirstName;
    const apellidoPaternoCoincide = inputFirstLastName === apiFirstLastName;
    const apellidoMaternoCoincide = inputSecondLastName === apiSecondLastName;

    return (
      nombresCoinciden &&
      apellidoPaternoCoincide &&
      apellidoMaternoCoincide &&
      normalize(dni) === normalize(datos.document_number)
    );
  }
}

