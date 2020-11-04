import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatusKeys = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusAllowed(value)) {
            throw new BadRequestException(`"${value}" is not a valid status code`);
        }
        return value;
    }

    private isStatusAllowed(value) {
        const idx = this.allowedStatusKeys.indexOf(value)
        return idx !== -1;
    }
}