import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('post')
	getAllPosts() {
		return this.adminService.getAllPosts();
	}

	@Get('system-info')
	getSystemInfo() {
		return this.adminService.getSystemInfo();
	}

	@Get('exception')
	getAllExceptions() {
		return this.adminService.getAllExceptions();
	}
}
