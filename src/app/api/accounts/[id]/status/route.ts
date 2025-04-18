import { NextResponse } from 'next/server';
import { Account } from '@/types';

// In-memory storage for demonstration (replace with database in production)
let accounts: Account[] = [];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const index = accounts.findIndex((a) => a.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    const updatedAccount: Account = {
      ...accounts[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    accounts[index] = updatedAccount;

    return NextResponse.json(updatedAccount);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update account status' },
      { status: 500 }
    );
  }
} 