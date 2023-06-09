export default function ProPromotion() {
  return (
    <div className="md:col-span-2">
      <p>Promote to Pro</p>
      <div className="indicator">
        <div className="card border">
          <div className="card-body">
            <h2 className="card-title">Become A Pro Memeber</h2>
            <ul className="list-inside list-disc">
              <li>Unlock new features and add-ons</li>
              <li>Bury as many time capsules as you like</li>
              <li>Unlock all available delivery methods</li>
              <div className="mt-4">
                <button className="btn-primary btn">
                  Join Now For Just £2
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
