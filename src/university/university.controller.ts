import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityCreate, UniversityUpdate } from './dtos';
import { PageOptionDto } from '../common/dtos/pageOption.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewSuccessResponse } from '../common';
import { University } from './university.entity';
import { AuthGuard } from '../user/guards/jwt.guards';

@Controller('university')
@ApiTags('University')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @ApiOperation({ summary: 'create university' })
    @ApiResponse({
        status: 200,
        description: 'create university successfully',
        type: University,
    })
    // @UseGuards(AuthGuard)
    @Post()
    async createUniversity(@Body() data: UniversityCreate) {
        return this.universityService.createUniversity(data);
    }

    @ApiOperation({ summary: 'update university' })
    @ApiResponse({ status: 200, description: 'update university successfully' })
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUniversity(
        @Param('id') id: string,
        @Body() data: UniversityUpdate,
    ) {
        return this.universityService.updateUniversity(id, data);
    }

    @ApiOperation({ summary: 'Delete university' })
    @ApiResponse({
        status: 200,
        description: 'Delete university successfully',
        type: NewSuccessResponse,
    })
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUniversity(@Param('id') id: string) {
        return this.universityService.deleteUniversity(id);
    }

    @ApiOperation({ summary: 'List university' })
    @ApiResponse({ status: 200, description: 'Return list of university' })
    @Get()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    listUniversity(@Query() pageOption: PageOptionDto) {
        return this.universityService.listUniversity(pageOption);
    }
}
