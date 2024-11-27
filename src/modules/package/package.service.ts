import { dataSource } from '../../dataSource';
import { Package } from './Package.entity';

function buildPackageService() {
    const packageRepository = dataSource.getRepository(Package);
    return {
        getPackages,
        getPackage,
    };

    function getPackages() {
        const packages = packageRepository.find({
            order: { paperCount: 'ASC' },
            select: { id: true, paperCount: true, price: true },
        });
        return packages;
    }

    function getPackage(packageId: Package['id']) {
        const packages = packageRepository.findOneOrFail({
            where: { id: packageId },
            select: { id: true, paperCount: true, price: true },
        });
        return packages;
    }
}

export { buildPackageService };
