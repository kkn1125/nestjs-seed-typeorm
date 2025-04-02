import { FirebaseAuthGuard } from '@/firebase/firebase-auth.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export const RequireLogin = () => applyDecorators(UseGuards(FirebaseAuthGuard));
