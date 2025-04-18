import { NextResponse } from 'next/server';
import { Account } from '@/types';

// In-memory storage for demonstration (replace with database in production)
let accounts: Account[] = [];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const account = accounts.find((a) => a.id === params.id);
    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = accounts.findIndex((a) => a.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    const updatedAccount: Account = {
      ...accounts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    accounts[index] = updatedAccount;

    return NextResponse.json(updatedAccount);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update account' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const index = accounts.findIndex((a) => a.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    accounts = accounts.filter((a) => a.id !== params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
} 