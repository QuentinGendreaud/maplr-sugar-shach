import { readFile, writeFile } from 'fs/promises';
import { mergeMap, Observable } from 'rxjs';
import { serviceResponseConstantes } from '../constants/service-response.const';
import FileNameEnum from '../enums/file-name.enum';

class FileService {
  private filePath: string = './data/';

  public readFile(fileName: FileNameEnum): Observable<any> {
    return new Observable((subscriber) => {
      readFile(`${this.filePath}${fileName}`, { encoding: 'utf8' })
        .then((fileData) => {
          subscriber.next(JSON.parse(fileData));
        })
        .catch((error) => {
          subscriber.error(error.code ? serviceResponseConstantes.NOT_FOUND : serviceResponseConstantes.SERVER_ERROR);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }

  public updateFile(fileName: FileNameEnum, data: any): Observable<void> {
    const formattedData = new Uint8Array(Buffer.from(JSON.stringify(data)));
    return new Observable((subscriber) => {
      writeFile(`${this.filePath}${fileName}`, formattedData, { encoding: 'utf8' })
        .then(() => {
          subscriber.next();
        })
        .catch(() => {
          subscriber.error(serviceResponseConstantes.BAD_REQUEST);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }

  public addElementInFile(fileName: FileNameEnum, dataObject: any): Observable<void> {
    return this.readFile(fileName).pipe(
      mergeMap((fileData) => {
        const updatedData = [...fileData, dataObject];
        return this.updateFile(fileName, updatedData);
      })
    );
  }
}

export default FileService;
