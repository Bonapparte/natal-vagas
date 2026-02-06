import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { jobId, planName, amount } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Vaga Premium - ${planName}`,
              description: `Impulsionamento para a vaga #${jobId}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/financeiro?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/vagas/premium?canceled=true`,
      metadata: {
        jobId,
        planName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
