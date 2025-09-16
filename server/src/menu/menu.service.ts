import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from './menu.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {

    constructor(@InjectModel(Menu) private menuRepository: typeof Menu) {}

    async createMenuItem(dto: CreateMenuDto) {
        const menuItem = await this.menuRepository.create(dto);
        return menuItem;
    }

    async getAllMenuItems() {
        return this.menuRepository.findAll({
            order: [['category', 'ASC'], ['name', 'ASC']]
        });
    }

    async getMenuItemById(id: number) {
        const menuItem = await this.menuRepository.findByPk(id);
        
        if (!menuItem) {
            throw new NotFoundException('Позиция меню не найдена');
        }
        
        return menuItem;
    }

    async updateMenuItem(id: number, dto: CreateMenuDto) {
        const menuItem = await this.menuRepository.findByPk(id);
        
        if (!menuItem) {
            throw new NotFoundException('Позиция меню не найдена');
        }

        await menuItem.update(dto);
        return menuItem;
    }

    async deleteMenuItem(id: number) {
        const menuItem = await this.menuRepository.findByPk(id);
        
        if (!menuItem) {
            throw new NotFoundException('Позиция меню не найдена');
        }

        await menuItem.destroy();
        return { message: 'Позиция меню успешно удалена' };
    }

    async getMenuByCategory(category: string) {
        return this.menuRepository.findAll({
            where: { category },
            order: [['name', 'ASC']]
        });
    }

    async getAvailableMenuItems() {
        return this.menuRepository.findAll({
            where: { isAvailable: true },
            order: [['category', 'ASC'], ['name', 'ASC']]
        });
    }
}
