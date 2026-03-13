import * as XLSX from 'xlsx';
import { Injectable } from '@nestjs/common';
import { CreateInstituteCommand } from '../../domain/model/commands/create-institute.command';

@Injectable()
export class InstituteExcelService {
    async parseExcel(buffer: Buffer): Promise<CreateInstituteCommand[]> {
        try {
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Leer encabezados desde la fila 3 (índice 2)
            const headers: string[] = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 2 })[0] as string[];

            // Validar columnas requeridas
            const requiredColumns = ['COD_MOD', 'CODLOCAL', 'CEN_EDU', 'D_NIV_MOD', 'DIR_CEN', 'D_DREUGEL'];
            for (const col of requiredColumns) {
                if (!headers.includes(col)) {
                    throw new Error(`Falta la columna requerida: ${col}`);
                }
            }

            // Leer datos desde la fila 3 usando los encabezados correctos
            const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '', range: 2 });

            return rows.map(row => new CreateInstituteCommand(
                row['COD_MOD'],
                row['CODLOCAL'],
                row['CEN_EDU'],
                row['D_NIV_MOD'],
                row['DIR_CEN'],
                row['D_DREUGEL']
            ));
        } catch (error) {
            return [];
        }
    }
}