import { SetMetadata } from '@nestjs/common';

export const ResourceType = (resourceType: string) => SetMetadata('resourceType', resourceType);
