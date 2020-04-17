import { Controller, Post, Req, Res } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';

@Controller('fileUpload')
export class ImageUploadController {
    constructor(private readonly imageUploadService: ImageUploadService) {}

    @Post()
    async create(@Req() request, @Res() response) {
        return await this.imageUploadService.fileupload(request, response);
    }
}
