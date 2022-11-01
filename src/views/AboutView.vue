<template>
  <!-- hero section -->
  <div class="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap items-center">
        <div class="w-full px-4">
          <div class="hero-content mx-auto max-w-[780px] text-center">
            <h1
              class="mb-16 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
              About This Site</h1>
            <!-- <p class="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4]">Sign in to this site</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- hero section end -->

  <!-- page detail -->
  <section class="bg-[#f4f7ff] pt-10 pb-10 lg:pt-[120px] lg:pb-20">
    <div class="container">
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="w-full px-4">
          <div class="-mx-4 flex flex-wrap justify-center">
            <div class="bg-white w-[80%] my-4 py-4 px-4 lg:w-8/12">
              <div class="text-2xl text-center">This is an about page</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- page detail end -->

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
