export default function ScratchComponent({ objectJson }) {
  return (
    <section>
      <div className="scratch-div flex">
        <div className="composer-name text-9xl capitalize">{objectJson.firstName}</div>
        <div className="test-text-one text-blue-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel eaque explicabo? Distinctio ex id sapiente
          necessitatibus iste quisquam perferendis dolorem repudiandae? Tempore suscipit vero inventore natus sint
          doloremque exercitationem!
        </div>
        <div className="test-text-two">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut architecto illum sint inventore recusandae odit
          libero, praesentium placeat consequuntur, atque ut ab rerum. Necessitatibus velit ex autem maiores recusandae
          tenetur?
        </div>
      </div>
    </section>
  );
}
