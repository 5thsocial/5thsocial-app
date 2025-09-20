import { PipeTransform } from '@nestjs/common';
export declare class UUIDValidationPipe implements PipeTransform<string> {
    transform(value: string): string;
}
